/*--------------------------------------------------------------------------------------------------
 *                       Copyright (c) Ayyoub EL Kouri. All rights reserved
 *     Becoming an expert won’t happen overnight, but with a bit of patience, you’ll get there
 *------------------------------------------------------------------------------------------------*/

import { useState } from "react";
import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

import { useAccentColor } from "@shared/hooks";

interface ConfirmationAlertProps {
	button: any;
	title: string;
	description: string;
	callback: () => void;
	className?: string;
}

export function ConfirmationButton({
	button,
	title,
	description,
	callback,
	className,
}: ConfirmationAlertProps) {
	const { secondary } = useAccentColor();
	const [isOpen, setIsOpen] = useState(false);

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	return (
		<>
			<Button className={className} onClick={open}>
				{button}
			</Button>

			<Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
				<DialogBackdrop
					className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity
                           duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
				/>

				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl 
                                duration-200 ease-out data-closed:transform-[scale(95%)]
                                data-closed:opacity-0"
						>
							<DialogTitle as="h3" className="text-base/7 font-medium text-white">
								{title}
							</DialogTitle>

							<p className="mt-2 text-sm/6 text-white/50">{description}</p>
							<div className="mt-4 flex justify-end gap-2">
								<Button
									className="gap-2 rounded-md w-25 h-8 border-1 border-border text-white
                                    data-hover:bg-white/10"
									onClick={close}
								>
									Cancel
								</Button>

								<Button
									className="gap-2 rounded-md w-25 border-1 border-border text-white 
                                    data-hover:bg-white/10"
									style={{ backgroundColor: secondary }}
									onClick={() => {
										close();
										callback();
									}}
								>
									Continue
								</Button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	);
}
