import { ChangeEventHandler } from "react";

const Switcher = ({
  checked,
  onChange,
}: {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <label className="relative flex cursor-pointer select-none items-center">
      <input
        type="checkbox"
        name="autoSaver"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`mr-3 flex h-[24px] w-[50px] items-center rounded-full p-1 duration-200 ${
          checked ? "bg-black/30" : "bg-black/30"
        }`}
      >
        <div
          className={`h-[18px] w-[17px] rounded-full bg-white duration-200 ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </div>
    </label>
  );
};

export default Switcher;
