import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
export function LanguageSelector() {
  return (
    <Select>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Français" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="francais">Français</SelectItem>
          <SelectItem value="arabe">العربية</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}