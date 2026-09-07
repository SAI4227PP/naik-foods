function ErrorMessage({
  title = 'Something went wrong',
  message = 'Unable to load the requested data.',
  buttonText = 'Try Again',
  onRetry,
}) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry()
      return
    }

    window.location.reload()
  }

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
      <h2 className="font-serif text-2xl font-bold text-red-800">
        {title}
      </h2>

      <p className="mt-2 text-sm text-red-700">
        {message}
      </p>

      <button
        type="button"
        onClick={handleRetry}
        className="mt-5 rounded-xl bg-[#6d2e16] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9a4b26]"
      >
        {buttonText}
      </button>
    </div>
  )
}

export default ErrorMessage