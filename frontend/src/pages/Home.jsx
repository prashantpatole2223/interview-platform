import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  DoorOpen,
  MessageSquare,
  Play,
  ShieldCheck,
  Users,
  Video
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleAuthRedirect = () => {
    navigate("/login");
  };

  const features = [
    {
      icon: DoorOpen,
      title: "Create Interview Rooms",
      description:
        "Create a private interview room and invite another participant using a simple room code."
    },
    {
      icon: Users,
      title: "Join Interviews",
      description:
        "Join an existing interview instantly using the room code shared with you."
    },
    {
      icon: Video,
      title: "Real-Time Video",
      description:
        "Communicate face-to-face during interviews with real-time video and audio."
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description:
        "Stay connected with your interviewer through real-time messaging inside the room."
    },
    {
      icon: Code2,
      title: "Collaborative Interviewing",
      description:
        "A workspace designed to make technical interviews more interactive and engaging."
    },
    {
      icon: ShieldCheck,
      title: "Private Sessions",
      description:
        "Your interview rooms are designed for private sessions between participants."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-slate-200/50 blur-3xl" />
            <div className="absolute -right-20 top-32 h-72 w-72 rounded-full bg-slate-200/40 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Real-time interview platform
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Conduct better
                <span className="block text-slate-500">
                  technical interviews.
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Create an interview room, invite a participant,
                communicate in real time, and conduct technical
                interviews from one simple platform.
              </p>

              <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={handleAuthRedirect}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Create a Room
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </button>

                <button
                  onClick={handleAuthRedirect}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  <DoorOpen size={18} />
                  Join a Room
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500"
                  />
                  Private rooms
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500"
                  />
                  Real-time communication
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500"
                  />
                  Simple room codes
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">
              <div className="flex aspect-[16/10] items-center justify-center bg-slate-200">
                <img
                  src="/images/image1.webp"
                  alt="Interview workspace"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Built for interviews
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Everything you need for a focused interview
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-600">
                Keep the interview experience simple and
                distraction-free. Create a room, invite your
                participant, and communicate through the
                interview workspace.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "Quick room creation and joining",
                  "Real-time participant communication",
                  "Private interview sessions",
                  "Interview history and room details"
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-emerald-500"
                    />
                    <span className="text-sm font-medium text-slate-700 sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Features
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                A complete interview experience
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-600">
                Everything is organized around making
                technical interviews easier to conduct.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon size={21} />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-slate-950">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <span className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Simple workflow
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Start an interview in seconds
              </h2>

              <div className="mt-8 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                    1
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Create or join a room
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Start your own interview room or
                      enter a room code from another
                      participant.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                    2
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Connect with your participant
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Enter the interview room and
                      communicate in real time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">
                    3
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950">
                      Conduct the interview
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      Focus on the candidate while the
                      platform handles the room
                      experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm lg:order-2">
              <div className="flex aspect-[16/10] items-center justify-center bg-slate-200">
                <img
                  src="/images/image2.jpg"
                  alt="Interview workspace"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-950">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to conduct your next interview?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Create a room or join an existing interview session
              and get started.
            </p>

            <button
              onClick={handleAuthRedirect}
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Get Started
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;