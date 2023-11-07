// import { Dialog, DialogContent, Slide } from "@mui/material";
// import { TransitionProps } from "@mui/material/transitions";

// import CloseIcon from "@mui/icons-material/Close";
// import React from "react";
// import { IEvent } from "@/services/interfaces/common";
// import Image from "next/legacy/image";
// import Link from "next/link";

// type Props = {
//   isVisible: boolean;
//   handleClose: () => void;
//   activeEvent: IEvent;
// };

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// function EventPopUp({ isVisible, handleClose, activeEvent }: Props) {
//   return (
//     <Dialog
//       open={isVisible}
//       TransitionComponent={Transition as any}
//       keepMounted
//       onClose={handleClose}
//       aria-describedby="alert-dialog-slide-description"
//     >
//       <div className="w-[calc(min(80vw,500px))] h-auto p-2 px-3 lg:p-4">
//         <div className="flex mb-2 lg:mb-4">
//           <div className="text-md lg:text-lg font-semibold">
//             {activeEvent.title}
//           </div>
//           <CloseIcon
//             className="cursor-pointer ml-auto"
//             fontSize="small"
//             onClick={handleClose}
//           />
//         </div>

//         <div className="relative w-full h-40 rounded-md overflow-hidden mb-4">
//           <Image src={activeEvent.image.url} layout="fill" objectFit="cover" />
//         </div>

//         <div className="mb-4 text-sm md:text-base">
//           {activeEvent.description}
//         </div>
//         <Link href={activeEvent.action.url} target="_blank">
//           <div className="bg-brand p-2 text-white text-md lg:text-lg text-center rounded-md cursor-pointer">
//             {activeEvent.action.label}
//           </div>
//         </Link>
//       </div>
//     </Dialog>
//   );
// }

// export { EventPopUp };
