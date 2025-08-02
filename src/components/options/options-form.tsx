"use client";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { InputErrorTooltip } from "../utils/forms/input-error-tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "../ui/button";
import OptionsService from "@/services/options/options.service";
import { useCustomToast } from "@/lib/toast-util";
import { useEffect, useState } from "react";

const OptionsForm = ({ type }: { type: string }) => {
  const [submitted, setSubmitted] = useState(false);
  const toast = useCustomToast();
  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    remarks: z.string().optional()
  });
  
  type FormValues = z.infer<typeof formSchema>;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      remarks: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: FormValues) {
    setSubmitted(true);
    try {
      await OptionsService.createOrUpdate({
        ...values,
        type,
        status: true,
      });

      toast({title:"", description:"Option created successfully"});
      form.reset(); // Clear the form after submission
    } catch (error) {
      console.error("Failed to create option:", error);
      toast({title: "Error", description: "Failed to create option", level:"error"});
    }
    setSubmitted(false);
  }
    useEffect(()=>{
      form.reset();
    },[type])
  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 md:space-y-0 md:flex gap-5 items-center">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <InputErrorTooltip error={form.formState.errors.name?.message} side="top">
                    <FormControl>
                      <Input placeholder="Option Name" {...field} />
                    </FormControl>
                  </InputErrorTooltip>
                </FormItem>
              )}
            />

            {/* Remarks */}
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <InputErrorTooltip error={form.formState.errors.remarks?.message} side="right">
                    <FormControl>
                      <Input placeholder="Remarks (optional)" {...field} />
                    </FormControl>
                  </InputErrorTooltip>
                </FormItem>
              )}
            />

            <div className="self-end">
              <Button type="submit" className="w-full disabled:bg-primary/30" disabled={submitted}>Save</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default OptionsForm;
