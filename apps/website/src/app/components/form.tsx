"use client";

import { ArrowUpRight } from "lucide-react";
import { action } from "@/lib/action";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";

export default function Form() {
	const status = useFormStatus();
	const [state, dispatch] = useActionState(action, { ok: false });
	const form = useForm();

	useEffect(() => {
		if (!state.ok) return;
		const html = state.response;
		const file = new Blob([html], { type: "text/html" });
		const url = URL.createObjectURL(file);

		// download the file
		const a = document.createElement("a");
		a.href = url;
		a.target = "_blank";
		a.download = "index.html";
		a.click();

		// clean up
		URL.revokeObjectURL(url);
	}, [state]);

	return (
		<form action={dispatch} className="flex flex-col gap-4">
			<div className="flex items-start justify-start gap-4">
				<div className="grid gap-3">
					<Input
						{...form.register("url", { required: true })}
						autoFocus
						required
						name="url"
						type="url"
						placeholder="https://arc.net/space/ABCD-EFG"
					/>
					<em className="text-xs">
						Pase your ARC share URL above to convert it into a bookmark file.
					</em>
				</div>
				<Button
					data-s:event="form.submit"
					variant="neutral"
					type="submit"
					disabled={
						status.pending ||
						!form.formState.isValid ||
						form.formState.isSubmitting
					}
				>
					Grab Now
					<ArrowUpRight size={16} />
				</Button>
			</div>
		</form>
	);
}
