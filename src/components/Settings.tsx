import { useSettingsStore } from "../stores/useSettingsStore";
import { Checkbox, Input, Select } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";

function Settings({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) {
  const {
    fontSize,
    fontFamily,
    cursorStyle,
    cursorBlink,
    cursorInactiveStyle,
    lineHeight,
    letterSpacing,
    setFontSize,
    setFontFamily,
    setCursorStyle,
    setCursorBlink,
    setCursorInactiveStyle,
    setLineHeight,
    setLetterSpacing,
  } = useSettingsStore();

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center opacity-50 p-2 border-b border-white/5">
        <h2 className="text-xs">Settings</h2>
        <button
          className="rounded-full px-2 py-1 text-xxs bg-black/20 hover:bg-white/10 cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
      <div className="h-full text-xs overflow-auto no-scrollbar">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex flex-col gap-1">
            <span className="opacity-50">Font</span>
            <div className="flex gap-2">
              <Input
                type="text"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="w-full rounded-md border-none bg-white/5 py-1 px-2 text-white
            focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              />
              <div className="flex bg-white/5 rounded-md">
                <button
                  className="flex items-center justify-center w-6 cursor-pointer"
                  onClick={() => setFontSize((fontSize ?? 0) - 1)}
                >
                  <MinusIcon className="size-3" />
                </button>
                <div className="flex items-center justify-center w-6">
                  {fontSize}
                </div>
                <button
                  className="flex items-center justify-center w-6 cursor-pointer"
                  onClick={() => setFontSize((fontSize ?? 0) + 1)}
                >
                  <PlusIcon className="size-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1 w-full">
              <span className="opacity-50">Line Height</span>
              <div className="flex">
                <Input
                  type="number"
                  step={0.1}
                  value={lineHeight}
                  onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                  min={1}
                  max={10}
                  className="w-full rounded-md border-none bg-white/5 py-1 px-2 text-white
            focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <span className="opacity-50">Letter Spacing</span>
              <Input
                type="number"
                step={0.1}
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                min={1}
                max={10}
                className="w-full rounded-md border-none bg-white/5 py-1 px-2 text-white
            focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col w-full gap-1">
              <span className="opacity-50">Cursor Style</span>
              <div className="relative flex items-center">
                <Select
                  value={cursorStyle}
                  onChange={(e) => setCursorStyle(e.target.value as any)}
                  className="w-full appearance-none rounded-md border-none bg-white/5 py-1 px-2 text-white border border-white
                focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                >
                  <option value="block">Block</option>
                  <option value="underline">Underline</option>
                  <option value="bar">Bar</option>
                </Select>
                <ChevronUpDownIcon
                  className="group pointer-events-none absolute right-0.5 size-4 fill-white/60"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1">
              <span className="opacity-50">Inactive Cursor</span>
              <div className="relative flex items-center">
                <Select
                  value={cursorInactiveStyle}
                  onChange={(e) =>
                    setCursorInactiveStyle(e.target.value as any)
                  }
                  className="w-full appearance-none rounded-md border-none bg-white/5 py-1 px-2 text-white
                focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                >
                  <option value="block">Block</option>
                  <option value="underline">Underline</option>
                  <option value="bar">Bar</option>
                </Select>
                <ChevronUpDownIcon
                  className="group pointer-events-none absolute right-0.5 size-4 fill-white/60"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="opacity-50">Cursor Blink</span>
            <Checkbox
              checked={cursorBlink}
              onChange={setCursorBlink}
              className="group flex items-center justify-center size-5 rounded-md bg-white/10 data-[checked]:bg-white/10"
            >
              <CheckIcon className="hidden size-3 fill-white group-data-[checked]:block" />
            </Checkbox>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
