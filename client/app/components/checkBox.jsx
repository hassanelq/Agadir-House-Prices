export default function CheckBox(propriety) {
  return (
    <label
      class="relative flex cursor-pointer items-center justify-center gap-[1em]"
      for="star"
    >
      <input
        class="peer appearance-none"
        id="star"
        name="star"
        type="checkbox"
      />
      <span class="absolute left-0 top-1/2 h-[2em] w-[2em] -translate-x-full -translate-y-1/2 rounded-[0.25em] border-[1px] border-white"></span>
      <svg
        class="absolute p-[2px] left-0 top-1/2 h-[2em] w-[2em] -translate-x-full -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]"
        viewBox="0 0 38 37"
        fill="none"
        height="37"
        width="38"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.617 36.785c-.676-5.093 4.49-10.776 6.318-14.952 1.887-4.31 4.315-10.701 6.055-15.506C20.343 2.59 20.456.693 20.57.789c3.262 2.744 1.697 10.518 2.106 14.675 1.926 19.575 4.62 12.875-7.635 4.43C12.194 17.933 2.911 12.1 1.351 8.82c-1.177-2.477 5.266 0 7.898 0 2.575 0 27.078-1.544 27.907-1.108.222.117-.312.422-.526.554-1.922 1.178-3.489 1.57-5.266 3.046-3.855 3.201-8.602 6.002-12.11 9.691-4.018 4.225-5.388 10.245-11.321 10.245"
          stroke-width="2px"
          pathLength="100"
          stroke="white"
        ></path>
      </svg>
      <p class="text-[1em] font-semibold [user-select:none]">{propriety}</p>
    </label>
  );
}
