/**
 * Implement this interface for anything that should be able
 * to render a line-item in the DataWebTooltip Tooltip
 */
interface TooltipItemRenderer {
  id(): string;
  labelMedium(subtype: string): string;
  label?(subtype: string): string | null | undefined;
  labelSmall?(subtype: string): string | null | undefined;
}

type PosFn = () => { x: number; y: number; height: number; width: number; }

interface AttachArgs {
  form: import("../Form/Form").Form;
  input: HTMLInputElement;
  getPosition: PosFn;
  click: { x: number; y: number; } | null;
  topContextData: TopContextData
}

/**
 * The tooltip interface is an abstraction over the concept
 * of 'attaching'. On ios/android this may result in nothing more than showing
 * an overlay, but on other platforms it may... todo(Shane): Description
 */
interface TooltipInterface {
  attach(args: AttachArgs): void;
}
