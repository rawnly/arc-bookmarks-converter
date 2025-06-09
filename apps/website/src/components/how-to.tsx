"use client";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

import { Drawer } from "vaul";

export default function HowTo() {
	return (
		<Drawer.Root direction="right">
			<Drawer.Trigger asChild>
				<Button data-s:event="how-to.click" variant="neutral">
					How To
				</Button>
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className="fixed inset-0 bg-black/40" />
				<Drawer.Content
					className="right-4 top-4 bottom-4 fixed z-10 outline-none w-[310px] flex"
					style={
						{
							"--initial-transform": "calc(100% + 16px)",
						} as React.CSSProperties
					}
				>
					<Card className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
						<div className="max-w-lg mx-auto flex-1">
							<Drawer.Title className="font-medium mb-2 text-zinc-900">
								How to get the share url
							</Drawer.Title>
							<div className="markdown text-zinc-600 mb-2 overflow-y-auto">
								<ol className="list-decimal text-justify">
									<li className="mt-2">
										<b>Generate a sharable url from your Arc space</b>
										<ul className="list-disc mt-4 space-y-2">
											<li className="block">
												Go into your Arc space, on the top right corner of your
												sidebar you'll see 3 dots. Click and select "Share".
											</li>
										</ul>
									</li>
								</ol>
							</div>
						</div>

						<Drawer.Close asChild>
							<Button className="mt-auto" variant="reverse">
								Okay
							</Button>
						</Drawer.Close>
					</Card>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
