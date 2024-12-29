"use client";


import "../../globals.css";

export default function Page() {
    return (
        <section className="flex flex-col gap-24 md:px-3 lg:px-0 ">
        </section>
    );
}

// const Rector = ({ close }: { close?: ReactNode }) => {
//   return (
//     <Container className="relative rounded-xl md:rounded-3xl w-full max-h-[100svh] md:max-h-[54rem]  md:max-w-[70.875rem]   bg-abu_primary  mb-3 px-0 md:px-3">
//       {close}
//       <section className="px-0 py-12 lg:p-[4.3rem]">
//         <Heading className="text-white text-center md:text-left">
//           Обращение
//         </Heading>
//         <form className="grid grid-cols-1 lg:grid-cols-2 gap-x-0 gap-y-4 lg:gap-4 ">
//           <div className="flex flex-col gap-3 lg:gap-8">
//             <RectorFormInput placeholder="ФИО" icon="/rector/user.svg" />
//             <RectorFormInput
//               placeholder="Почта"
//               gap={false}
//               icon="/rector/email.svg"
//             />
//             <RectorFormInput
//               placeholder="Телефон"
//               type="tel"
//               gap={false}
//               icon="/rector/tel.svg"
//             />
//           </div>
//           <div className="flex flex-col gap-3 col-start-1 lg:col-start-2">
//             <Select>
//               <SelectTrigger className=" px-6 py-7 lg:py-9 rounded-[10rem]  text-abu_primary">
//                 <SelectValue placeholder={"Обращение"} />
//               </SelectTrigger>
//               <SelectContent className="">
//                 <SelectItem value="ru">Обращение</SelectItem>
//                 <SelectItem value="ru">Обращение к ректору</SelectItem>
//                 <SelectItem value="ru">Претензия</SelectItem>
//                 <SelectItem value="ru">Сообщение о коррупции</SelectItem>
//               </SelectContent>
//             </Select>
//             <RectorFormTextarea
//               className="min-h-[12.5rem]"
//               placeholder="Текст сообщения"
//               icon="/rector/message.svg"
//             />
//           </div>
//           <button className="px-14 py-3 rounded-[5rem] col-span-2   w-full  text-center bg-[#FDC90C] text-[#1A0700]">
//             Отправить
//           </button>
//         </form>
//       </section>
//     </Container>
//   );
// };

// const AppealDialog = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <Dialog
//       open={open}
//       onOpenChange={() => {
//         setOpen(!open);
//       }}
//     >
//       <DialogTrigger className="fixed z-[30] right-0 top-1/2 -translate-y-1/2 lg:p-5 p-3 bg-slate-200 border border-slate-300 rounded-tl-md rounded-bl-md  cursor-pointer ">
//         <Image
//           src={"/icons/appeal.svg"}
//           alt="appeal-trigger"
//           width={32}
//           height={17}
//         />
//       </DialogTrigger>
//       <DialogContent className=" bg-opacity-0 bg-black border-none ">
//         <DialogHeader>
//           <DialogTitle className="opacity-0"></DialogTitle>
//           <DialogDescription className="opacity-0"></DialogDescription>
//         </DialogHeader>
//         <div className="">
//           <Rector
//             close={
//               <X
//                 onClick={() => setOpen(false)}
//                 className="absolute right-5 cursor-pointer top-5 "
//                 color="white"
//               />
//             }
//           />
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// interface RectorFormInput extends InputProps {
//   icon: string;
//   className?: string;
// }
// const RectorFormInput = ({
//   icon,
//   className,
//   ...inputProps
// }: RectorFormInput) => {
//   return (
//     <div className="relative  w-full">
//       <Image
//         src={icon}
//         alt="input-icon"
//         width={20}
//         height={20}
//         className="absolute left-8 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
//       />
//       <input
//         className={`pl-16  pr-3 lg:py-6 py-4 text-md w-full border border-gray-300 rounded-md  shadow-sm focus:outline-none focus:ring-2 focus:ring-abu_primary focus:border-transparent ${className}`} // Add additional styling as needed
//         {...inputProps}
//       />
//     </div>
//   );
// };
// interface RectorFormTextarea extends TextareaProps {
//   icon: string;
//   className?: string;
// }
// const RectorFormTextarea = ({
//   icon,
//   className,
//   ...textareaProps
// }: RectorFormTextarea) => {
//   return (
//     <div className="relative  w-full">
//       <Image
//         src={icon}
//         alt="input-icon"
//         width={20}
//         height={20}
//         className="absolute left-8 top-7 transform  text-gray-500 z-10"
//       />
//       <textarea
//         className={`pl-16  pr-3 lg:py-6  py-4 text-md w-full border border-gray-300 rounded-md  shadow-sm focus:outline-none focus:ring-2 focus:ring-abu_primary focus:border-transparent ${className}`} // Add additional styling as needed
//         {...textareaProps}
//       />
//     </div>
//   );
// };
