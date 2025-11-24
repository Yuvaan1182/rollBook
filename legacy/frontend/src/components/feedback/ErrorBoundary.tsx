import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  fallback?: ReactNode; // optional custom fallback
};

type State = {
  hasError: boolean;
  error?: Error;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  // 🔹 Update state so the next render shows fallback UI
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // 🔹 Log error details (e.g. to Sentry, LogRocket, Datadog)
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Global Error Caught:", error, errorInfo);
    // Example: send error to monitoring service
    // Sentry.captureException(error, { extra: errorInfo });
  }

  // 🔹 Reset error state (useful if user retries)
  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      // Default fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <h1 className="text-2xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="mt-2 text-gray-700">{this.state.error?.message}</p>
          <button
            onClick={this.resetError}
            className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
