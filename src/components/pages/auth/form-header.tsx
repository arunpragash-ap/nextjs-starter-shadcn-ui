// components/auth/FormHeader.tsx
interface FormHeaderProps {
  title: string;
  description: string;
}

export const FormHeader = ({ title, description }: FormHeaderProps) => (
  <div className="flex flex-col items-center text-center">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p className="text-muted-foreground text-balance">
      {description}
    </p>
  </div>
);