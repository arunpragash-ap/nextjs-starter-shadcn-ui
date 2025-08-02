"use client"

import AppLayout from "@/components/layout/app-layout";
import { DatePicker } from "@/components/ui/datepicker";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [checked, setChecked] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [commandValue, setCommandValue] = useState("");
  const [commandItems] = useState(["Apple", "Banana", "Orange", "Pear"]);

  return (
    <AppLayout>
      <div className="space-y-6 p-6 max-w-3xl mx-auto">
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Date Picker</h2>
          <div className="flex items-center gap-4">
            <DatePicker 
              value={date}
              onChange={setDate}
              placeholder="Select a date"
            />
            <Badge variant="outline">
              Selected: {date ? date.toLocaleDateString() : "None"}
            </Badge>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold">Checkbox</h2>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={checked}
              onCheckedChange={(checked) => setChecked(checked as boolean)}
            />
            <label htmlFor="terms" className="text-sm font-medium leading-none">
              Accept terms and conditions
            </label>
          </div>
          <Badge variant={checked ? "default" : "secondary"}>
            Status: {checked ? "Accepted" : "Not accepted"}
          </Badge>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold">Collapsible</h2>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[350px] space-y-2"
          >
            <div className="flex items-center justify-between space-x-4 px-4">
              <h4 className="text-sm font-semibold">
                Click to {isOpen ? "hide" : "show"} content
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 p-0">
                  <ChevronsUpDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2 p-4 border rounded-md">
              <div className="rounded-md border px-4 py-2 font-mono text-sm">
                This content is collapsible!
              </div>
              <div className="rounded-md border px-4 py-2 font-mono text-sm">
                You can put anything here.
              </div>
            </CollapsibleContent>
          </Collapsible>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold">Command</h2>
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search fruits..." />
            <CommandList>
              {commandItems.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={(value) => setCommandValue(value)}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
          <Badge variant="outline">
            Selected: {commandValue || "None"}
          </Badge>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold">Radio Group</h2>
          <RadioGroup 
            value={radioValue} 
            onValueChange={setRadioValue}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option1" id="option1" />
              <label htmlFor="option1">Option 1</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option2" id="option2" />
              <label htmlFor="option2">Option 2</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option3" id="option3" />
              <label htmlFor="option3">Option 3</label>
            </div>
          </RadioGroup>
          <Badge variant="outline">
            Selected: {radioValue}
          </Badge>
        </section>
      </div>
    </AppLayout>
  );
}