import { toast as sonnerToast } from "sonner@2.0.3";

export function useToast() {
  return {
    toast: (options: { title: string; description?: string }) => {
      sonnerToast(options.title, {
        description: options.description,
      });
    },
  };
}
