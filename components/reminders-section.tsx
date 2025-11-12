"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const reminderSchema = z.object({
  title: z.string().min(1, "Title is required"),
  when: z.string().min(1, "Date and time are required"),
  note: z.string().optional(),
  category: z.enum(["appointment", "vaccine", "wellness", "task"]),
});

type ReminderFormValues = z.infer<typeof reminderSchema>;

interface Reminder {
  id: string;
  title: string;
  when: string;
  note?: string;
  category: string;
  color: string;
}

export function RemindersSection() {
  const [showForm, setShowForm] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      title: "HepB #2",
      when: "Nov 7, 09:00 · Pete's 4-month shot",
      category: "vaccine",
      color: "bg-emerald-500",
    },
    {
      id: "2",
      title: "Ultrasound",
      when: "Oct 31, 10:30 · Anomaly scan",
      category: "appointment",
      color: "bg-amber-500",
    },
  ]);
  const { toast } = useToast();

  const form = useForm<ReminderFormValues>({
    resolver: zodResolver(reminderSchema),
    defaultValues: {
      title: "",
      when: "",
      note: "",
      category: "appointment",
    },
  });

  function onSubmit(data: ReminderFormValues) {
    const categoryColors: Record<string, string> = {
      appointment: "bg-amber-500",
      vaccine: "bg-emerald-500",
      wellness: "bg-blue-500",
      task: "bg-purple-500",
    };

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: data.title,
      when: new Date(data.when).toLocaleString(),
      note: data.note,
      category: data.category,
      color: categoryColors[data.category] || "bg-slate-500",
    };

    setReminders([newReminder, ...reminders]);
    form.reset();
    setShowForm(false);
    toast({
      title: "Reminder added",
      description: `${data.title} has been added to your reminders.`,
    });
  }

  return (
    <Card className="p-4" id="reminders" aria-labelledby="reminders-heading">
      <div className="flex items-center justify-between mb-2">
        <h3 id="reminders-heading" className="font-semibold">
          Reminders
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add"}
          </Button>
          <Link href="/reminders" className="text-sm text-violet-700 dark:text-violet-400 font-medium">
            See all
          </Link>
        </div>
      </div>

      {showForm && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 space-y-3 text-sm mb-3"
          >
            <div className="grid md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground uppercase tracking-wide">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Pediatric visit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="when"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground uppercase tracking-wide">
                      Date & time
                    </FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-[1fr,auto] gap-2">
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground uppercase tracking-wide">
                      Notes
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Add context (optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground uppercase tracking-wide">
                      Category
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="appointment">Appointment</SelectItem>
                        <SelectItem value="vaccine">Vaccine</SelectItem>
                        <SelectItem value="wellness">Wellness</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save reminder</Button>
            </div>
          </form>
        </Form>
      )}

      <ul className="space-y-2">
        {reminders.map((reminder) => (
          <li key={reminder.id} className="flex items-center gap-3 border rounded-xl px-3 py-2">
            <span className={`w-2 h-2 rounded-full ${reminder.color}`} aria-hidden="true"></span>
            <div>
              <p className="text-sm font-medium">{reminder.title}</p>
              <p className="text-xs text-muted-foreground">{reminder.when}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
