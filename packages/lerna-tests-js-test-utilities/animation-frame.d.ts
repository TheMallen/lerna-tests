export default class AnimationFrame {
  isUsingFakeAnimationFrame: boolean;
  private queued;
  private originalRequestAnimationFrame;
  private originalCancelAnimationFrame;
  private currentAnimationFrame;
  fake(): void;
  restore(): void;
  runFrame(): void;
  private requestAnimationFrame(callback);
  private cancelAnimationFrame(frame);
  private ensureAnimationFrameIsFake();
}
