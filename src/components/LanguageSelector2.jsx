
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export function LanguageSelector2() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();

  const onSelectChange = (value) => {
    const segments = pathname.split('/').filter(Boolean); // split and filter out empty segments
    segments[0] = value; // replace the locale segment
    const newPathname = `/${segments.join('/')}`; // reassemble the path

    startTransition(() => {
      router.replace(newPathname);
    });
  };
  return (
    <Select
      defaultValue={localActive}
      onValueChange={onSelectChange}
      disabled={isPending}
      dir={localActive === "ar" ? "rtl" : "ltr"}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Français" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="fr">Français</SelectItem>
          <SelectItem value="ar">العربية</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
