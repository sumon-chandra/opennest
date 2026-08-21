"use client"
"use client"

import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({
  date,
  setDate,
}: {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}) {
  return (
    <Field className="mx-auto w-full">
      <FieldLabel htmlFor="date-picker">Date</FieldLabel>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date-picker"
              className="justify-start font-normal"
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
            required
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
