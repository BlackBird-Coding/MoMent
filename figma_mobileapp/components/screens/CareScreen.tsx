import { useState, useRef } from 'react';
import { TodayCard } from '../TodayCard';
import { TrackerTile } from '../TrackerTile';
import { Calendar, Upload, FileText, ChevronDown, Clock, Activity } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../Logo';
import { TaskDetailModal } from '../modals/TaskDetailModal';
import { uploadFile, type UploadProgress } from '../../services/uploadService';

export function CareScreen() {
  const [tasks, setTasks] = useState([
    { id: '1', text: '4-month vaccination appointment at 2:00 PM', completed: false },
    { id: '2', text: 'Tummy time session (15 minutes)', completed: true },
    { id: '3', text: 'Log feeding times and amounts', completed: true },
    { id: '4', text: 'Evening bath routine with gentle massage', completed: false },
    { id: '5', text: 'Order diapers (running low - 5 left)', completed: false },
    { id: '6', text: 'Update growth chart measurements', completed: false },
    { id: '7', text: 'Read bedtime story - building routine', completed: false },
    { id: '8', text: 'Sterilize bottles and pacifiers', completed: true },
  ]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = (completedTasks / tasks.length) * 100;

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
    toast.success('Task updated', {
      description: 'Great job staying on track! 🎉',
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('File too large', {
        description: 'Please select a file smaller than 10MB',
      });
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid file type', {
        description: 'Please upload an image (JPG, PNG, GIF, WebP) or PDF',
      });
      return;
    }

    setIsUploading(true);

    try {
      // Show loading toast with progress
      const loadingToast = toast.loading('Uploading medical record...', {
        description: 'Preparing upload (0%)',
      });

      const result = await uploadFile(
        file,
        'medical-records',
        (progress: UploadProgress) => {
          // Update toast with progress
          toast.loading('Uploading medical record...', {
            description: `Uploading ${progress.percentage}%`,
            id: loadingToast,
          });
        }
      );

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (result.success && result.data) {
        toast.success('Upload successful!', {
          description: 'OCR will automatically extract details',
        });
        console.log('File uploaded:', result.data);
        // Here you can add the uploaded file to your state or perform other actions
      } else {
        toast.error('Upload failed', {
          description: result.error || 'Please try again',
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed', {
        description: 'An unexpected error occurred',
      });
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const upcomingAppointments = [
    {
      id: '1',
      title: 'Dr. Somchai - Wellness Check',
      date: 'Today, Oct 14',
      time: '2:00 PM',
      location: 'Bangkok Children\'s Hospital',
      type: 'Vaccination',
    },
    {
      id: '2',
      title: 'Dr. Nida - Follow-up',
      date: 'Oct 18, 2025',
      time: '10:30 AM',
      location: 'Happy Kids Clinic',
      type: 'Check-up',
    },
    {
      id: '3',
      title: 'Dental Screening',
      date: 'Nov 2, 2025',
      time: '3:00 PM',
      location: 'Smile Pediatric Dentistry',
      type: 'Dental',
    },
  ];

  const recentRecords = [
    { date: 'Oct 10', type: 'Check-up', doctor: 'Dr. Somchai', cost: '฿800' },
    { date: 'Sep 28', type: 'Vaccination', doctor: 'Dr. Preecha', cost: '฿650' },
    { date: 'Sep 15', type: 'Consultation', doctor: 'Dr. Nida', cost: '฿500' },
  ];

  const milestones = [
    { month: '3-4m', milestone: 'Holds head steady', achieved: true },
    { month: '3-4m', milestone: 'Pushes up on arms', achieved: true },
    { month: '4-5m', milestone: 'Rolls over', achieved: false },
    { month: '4-6m', milestone: 'Sits with support', achieved: false },
  ];

  return (
    <>
      <div className="flex-1 overflow-auto pb-20">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#F7FBFF] to-white px-4 pt-4 pb-3">
          <div className="mb-3">
            <Logo size="medium" />
          </div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#222]">Care Dashboard</h2>
            <button 
              onClick={() => {
                toast.info('Select child', {
                  description: 'Switch between family members',
                });
              }}
              className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg border border-[#E9ECF2] text-sm tap-highlight active:scale-95 transition-all duration-200"
            >
              Emma (4mo)
              <ChevronDown size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Today's Care Plan */}
        <div className="px-4 py-3">
          <TodayCard
            tasks={tasks}
            progress={progress}
            onAddTask={() => {
              toast.success('Add Care Task', {
                description: 'What would you like to track today?',
              });
            }}
            onTaskClick={(task) => setSelectedTask(task)}
          />
        </div>

        {/* Trackers */}
        <div className="px-4 py-3">
          <h3 className="mb-3 text-[#222]">Health Trackers</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <TrackerTile
              type="growth"
              label="Growth"
              value="6.2 kg"
              onClick={() => {
                toast.info('Growth Chart', {
                  description: '75th percentile - healthy development',
                });
              }}
            />
            <TrackerTile
              type="vaccine"
              label="Vaccines"
              value="75% done"
              onClick={() => {
                toast.info('Vaccine Schedule', {
                  description: 'Next: 4-month shots today at 2 PM',
                });
              }}
            />
            <TrackerTile
              type="sleep"
              label="Sleep Log"
              value="Last: 2h 15m"
              onClick={() => {
                toast.info('Sleep Patterns', {
                  description: 'Avg 14.5 hours/day - within normal range',
                });
              }}
            />
            <TrackerTile
              type="dental"
              label="Dental"
              value="No teeth yet"
              onClick={() => {
                toast.info('Teething Tracker', {
                  description: 'First tooth typically appears 4-7 months',
                });
              }}
            />
            <button
              onClick={() => {
                toast.info('Feeding Tracker', {
                  description: 'Last fed 2 hours ago - 120ml',
                });
              }}
              className="flex-shrink-0 w-28 bg-white rounded-2xl p-3 border border-[#E9ECF2] shadow-sm hover:shadow-md transition-all tap-highlight"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-[#FFA78B]/10 rounded-full flex items-center justify-center">
                  <Activity size={20} className="text-[#FFA78B]" />
                </div>
                <div className="text-center">
                  <p className="text-xs text-[#666] mb-1">Feeding</p>
                  <p className="text-sm text-[#222]">6x today</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Milestones */}
        <div className="px-4 py-3">
          <h3 className="mb-3 text-[#222]">Development Milestones</h3>
          <div className="bg-white rounded-2xl p-4 border border-[#E9ECF2] shadow-sm">
            <div className="space-y-2">
              {milestones.map((item, i) => (
                <button
                  key={i}
                  onClick={() => {
                    toast.info(item.milestone, {
                      description: item.achieved ? 'Achieved! Great progress 🎉' : 'Coming soon - every baby develops at their own pace',
                    });
                  }}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors tap-highlight text-left"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.achieved}
                      readOnly
                      className="w-4 h-4 rounded accent-[#6BBEFF] pointer-events-none"
                    />
                    <div>
                      <p className={`text-sm ${item.achieved ? 'text-gray-400 line-through' : 'text-[#222]'}`}>
                        {item.milestone}
                      </p>
                      <p className="text-xs text-[#666]">{item.month}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                toast.info('All Milestones', {
                  description: 'View complete developmental timeline',
                });
              }}
              className="w-full text-center text-sm text-[#6BBEFF] mt-3 tap-highlight"
            >
              View all milestones →
            </button>
          </div>
        </div>

        {/* Bookings & Records */}
        <div className="px-4 py-3">
          <h3 className="mb-3 text-[#222]">Appointments & Records</h3>
          
          <div className="space-y-3">
            {/* Upcoming Appointments */}
            {upcomingAppointments.map((apt) => (
              <button
                key={apt.id}
                onClick={() => {
                  toast.info('Appointment Details', {
                    description: 'View, reschedule, or add to calendar',
                  });
                }}
                className="w-full bg-white rounded-2xl p-4 border border-[#E9ECF2] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-md transition-all tap-highlight text-left"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar size={16} className="text-[#6BBEFF]" />
                      <span className="text-sm text-[#222]">{apt.title}</span>
                    </div>
                    <p className="text-sm text-[#666] mb-1">{apt.type}</p>
                    <div className="flex items-center gap-2 text-xs text-[#666]">
                      <Clock size={12} />
                      <span>{apt.date} • {apt.time}</span>
                    </div>
                    <p className="text-xs text-[#FFA78B] mt-1">📍 {apt.location}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    apt.date.includes('Today') 
                      ? 'bg-[#6BBEFF]/10 text-[#6BBEFF]' 
                      : 'bg-gray-100 text-[#666]'
                  }`}>
                    {apt.date.includes('Today') ? 'Today' : 'Upcoming'}
                  </span>
                </div>
              </button>
            ))}

            {/* Book visit button */}
            <button
              onClick={() => {
                toast.success('Opening booking flow...', {
                  description: 'Choose from verified pediatric clinics nearby',
                });
              }}
              className="w-full bg-gradient-to-r from-[#6BBEFF] to-[#E6B8FF] text-white rounded-2xl p-4 flex items-center justify-center gap-2 tap-highlight active:scale-[0.98] transition-all duration-200 shadow-[0_4px_12px_rgba(107,190,255,0.3)]"
            >
              <Calendar size={20} />
              Book a New Appointment
            </button>

            {/* Recent Records */}
            <div className="mt-4">
              <h4 className="text-sm text-[#222] mb-2">Recent Medical Records</h4>
              <div className="space-y-2">
                {recentRecords.map((record, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      toast.info('Medical Record', {
                        description: 'View details and receipts',
                      });
                    }}
                    className="w-full bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors tap-highlight text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#222]">{record.type}</p>
                        <p className="text-xs text-[#666]">{record.date} • {record.doctor}</p>
                      </div>
                      <span className="text-sm text-[#666]">{record.cost}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload records */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className={`w-full bg-white border-2 border-dashed border-[#E9ECF2] rounded-2xl p-4 flex items-center justify-center gap-2 text-[#666] hover:border-[#6BBEFF] hover:text-[#6BBEFF] transition-all duration-200 tap-highlight ${
                isUploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Upload size={20} className={isUploading ? 'animate-pulse' : ''} />
              {isUploading ? 'Uploading...' : 'Upload Medical Receipt or Record'}
            </button>
            <p className="text-xs text-center text-[#666] -mt-1">
              Supports photos, PDFs • Auto-extracts clinic, date, and costs • Max 10MB
            </p>
          </div>
        </div>

        {/* Insurance */}
        <div className="px-4 py-3">
          <h3 className="mb-3 text-[#222]">Health Insurance</h3>
          <button
            onClick={() => {
              toast.info('Insurance Details', {
                description: 'View coverage, claims, and comparison',
              });
            }}
            className="w-full bg-white rounded-2xl p-4 border border-[#E9ECF2] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-md transition-all tap-highlight text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#E6B8FF]/10 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-[#E6B8FF]" />
                </div>
                <div>
                  <p className="text-sm text-[#222]">Family Health Plan</p>
                  <p className="text-xs text-[#666]">Premium Plus Coverage</p>
                </div>
              </div>
              <span className="text-xs text-[#6BBEFF]">Compare →</span>
            </div>
            <div className="flex gap-2 mb-3">
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-[#666]">Coverage</p>
                <p className="text-sm text-[#222]">฿2M/year</p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-[#666]">Expires</p>
                <p className="text-sm text-[#222]">Dec 2025</p>
              </div>
              <div className="flex-1 bg-gray-50 rounded-lg p-2">
                <p className="text-xs text-[#666]">Used</p>
                <p className="text-sm text-[#222]">฿45K</p>
              </div>
            </div>
            <div className="flex gap-1 flex-wrap">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">OPD ✓</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">IPD ✓</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Dental ✓</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Vaccines ✓</span>
            </div>
          </button>
        </div>

        {/* Family Documents */}
        <div className="px-4 py-3 pb-6">
          <h3 className="mb-3 text-[#222]">Family Documents</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Vaccine Card', icon: FileText, count: 1 },
              { label: 'Insurance', icon: FileText, count: 2 },
              { label: 'Birth Cert', icon: FileText, count: 1 },
              { label: 'Lab Results', icon: FileText, count: 3 },
              { label: 'Prescriptions', icon: FileText, count: 2 },
              { label: 'X-rays', icon: FileText, count: 1 },
            ].map((doc) => (
              <button
                key={doc.label}
                onClick={() => {
                  toast.info(doc.label, {
                    description: `View ${doc.count} document(s)`,
                  });
                }}
                className="bg-white rounded-xl p-3 border border-[#E9ECF2] shadow-sm hover:shadow-md flex flex-col items-center gap-2 transition-all duration-200 tap-highlight active:scale-95"
              >
                <div className="relative">
                  <doc.icon size={24} className="text-[#6BBEFF]" />
                  {doc.count > 1 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFA78B] text-white text-[10px] rounded-full flex items-center justify-center">
                      {doc.count}
                    </span>
                  )}
                </div>
                <span className="text-xs text-center text-[#666]">{doc.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onToggle={() => {
            toggleTask(selectedTask.id);
            setSelectedTask(null);
          }}
        />
      )}
    </>
  );
}
