export function ConstructionBanner() {
	return (
		<div className="mx-auto w-full max-w-[1180px]">
			<div className="my-3 flex items-center gap-2 border border-[#e5d5b0] bg-[var(--soft-yellow)] px-3 py-1.5 font-[var(--font-sans)] text-[11px] leading-[1.4] text-[#5c4a2a] max-[920px]:mx-[clamp(20px,4vw,52px)]">
				<span aria-hidden="true" className="text-[12px]">
					🚧
				</span>
				<span>
					Under construction — some pages are still being written. Check back
					soon.
				</span>
			</div>
		</div>
	);
}
