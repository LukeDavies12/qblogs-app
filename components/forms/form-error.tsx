export default function FormError({ state }: { state: { error: string } | undefined }) {
  if (state && state.error)
    return (
      <div className="w-full p-4 bg-destructive my-4 text-destructive-foreground text-xs rounded-lg">
        <h3 className="font-bold">Error</h3>
        <p>{state.error}</p>
      </div>
    );
  return null;
}