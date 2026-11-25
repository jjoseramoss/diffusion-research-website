import { useState } from "react";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";

const wideMedia =
  "lg:relative lg:left-1/2 lg:w-[min(calc(100vw-10rem),72rem)] lg:-translate-x-1/2";
const imageStyles = "border-2 md:p-4 border-accent rounded-2xl ";
const exampleOptions = [
  "Overview",
  "One prompt for the sequence",
  "Prompt at each action",
  "More time per action",
];

const promptRows = [
  {
    behavior: "Walk",
    prompt: "a person walks forward",
    realN: 400,
    set: "Both",
  },
  { behavior: "Run", prompt: "a person runs forward", realN: 103, set: "Both" },
  {
    behavior: "Turn",
    prompt: "a person turns around",
    realN: 134,
    set: "Full",
  },
  {
    behavior: "Squat",
    prompt: "a person squats down and stands back up",
    realN: 37,
    set: "Full",
  },
  {
    behavior: "Jumping jacks",
    prompt: "a person does jumping jacks",
    realN: 0,
    set: "Excluded",
  },
  {
    behavior: "Jump",
    prompt: "a person jumps up and lands",
    realN: 132,
    set: "Both",
  },
  {
    behavior: "Punch",
    prompt: "a person throws a punch",
    realN: 28,
    set: "Both",
  },
  {
    behavior: "Kick",
    prompt: "a person kicks with their leg",
    realN: 54,
    set: "Both",
  },
  { behavior: "Sit", prompt: "a person sits down", realN: 78, set: "Both" },
  {
    behavior: "Raise arms",
    prompt: "a person raises both arms above their head",
    realN: 91,
    set: "Both",
  },
  {
    behavior: "Cartwheel",
    prompt: "a person does a cartwheel",
    realN: 3,
    set: "Excluded",
  },
  {
    behavior: "Stand",
    prompt: "a person stands up straight",
    realN: 237,
    set: "Control",
  },
] as const;

export default function App() {
  const [selectedExample, setSelectedExample] = useState(exampleOptions[0]);

  return (
    <>
      <main id="top" className="min-h-screen w-full bg-canvas text-ink">
        <Navbar />

        <section className="flex w-full flex-col items-center px-6 py-10 text-center lg:px-12 xl:px-20">
          <h1 className="max-w-5xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Ordering and Timing in Language-Conditioned Diffusion Motion
            Planning
          </h1>
          {/* <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a className={pillLink} href="/">
              GitHub
            </a>
            <a className={pillLink} href="/">
              Paper
            </a>
          </div> */}
        </section>

        <section className="flex justify-center">
          <div className="flex justify-center w-[80%] max-w-2xl">
            <video className="rounded-2xl " autoPlay loop muted playsInline>
              <source src="/preview-clip.webm" type="video/webm" />
            </video>
          </div>
        </section>

        <section
          aria-labelledby="introduction"
          className="w-full px-6 py-10 lg:px-12 xl:px-20"
        >
          <h2
            id="introduction"
            className="text-center scroll-mt-24 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Introduction
          </h2>
          <div className="mx-auto max-w-3xl">
            <p className="mt-5 text-lg leading-8 text-charcoal">
              Imagine asking a computer to animate a simulated person walking,
              turning, and then sitting. The motion may look convincing while
              leaving out an action, putting actions in the wrong order, or
              missing the time set aside for one of them.
            </p>
            <p className="mt-4 text-lg leading-8 text-charcoal">
              We studied CLoSD's existing Diffusion Planner (DiP), which
              predicts motion from written instructions and recent movement. We
              compared one prompt for the full sequence with a new prompt when
              each action's time interval began. We also tested whether allowing
              more time per action helped. We measured whether each action was
              detected in its assigned interval and whether the detections
              followed the requested order. These tests examined generated
              motion before physical tracking.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="method"
          className="w-full px-6 py-10 lg:px-12 xl:px-20"
        >
          <h2
            id="method"
            className="text-center scroll-mt-24 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Method
          </h2>
          <div className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-charcoal">
            <p>
              We used CLoSD&apos;s released Diffusion Planner (DiP) without
              retraining it. This version receives no target pose: it uses text
              and recent motion to generate the next segment of movement. We
              evaluated that generated motion before physical tracking by a
              controller.
            </p>
            <p className="mt-4">
              At 20 frames per second, DiP uses a 20-frame motion prefix and a
              text prompt to predict the next 40 frames. The first prefix came
              from motion capture; later predictions used frames DiP had
              generated.
            </p>

            <figure className={`my-15 ${wideMedia}`}>
              <img
                className={imageStyles}
                src="/images/fig1_planner_pipeline.png"
                alt="Text and recent motion enter the DiP planner, which predicts a future motion window before physical tracking."
              />
              <figcaption className="mx-auto mt-3 max-w-3xl text-sm leading-6">
                Figure 1. DiP predicts motion before physical tracking. The
                controller and feedback loop shown here are part of the broader
                CLoSD system, not the experiments evaluated on this page.
              </figcaption>
            </figure>

            <Timeline
              data={[
                {
                  title: "Build comparable sequences",
                  content: (
                    <p>
                      We formed 20 random four-action requests. Two- and
                      three-action requests were prefixes of those sequences.
                      Each request was generated from two rest-motion prefixes
                      with 20 random seeds, giving 800 trajectories per
                      prompting approach before exclusions. These were random
                      action combinations, not designed as coherent activities.
                    </p>
                  ),
                },
                {
                  title: "Compare prompting approaches",
                  content: (
                    <p>
                      At three seconds per action, we compared one prompt for
                      the full sequence with a new prompt at each action
                      boundary. Generated motion carried forward between
                      prompts. The actions, initial pose, seed, model weights,
                      and guidance scale matched across both approaches.
                    </p>
                  ),
                },
                {
                  title: "Vary the time available",
                  content: (
                    <p>
                      In a separate experiment using a new prompt at each
                      boundary, we varied the time per action from 2.5 to 8
                      seconds while keeping the actions, starting pose, and seed
                      fixed.
                    </p>
                  ),
                },
                {
                  title: "Detect each action",
                  content: (
                    <p>
                      Within each action&apos;s assigned interval, we took the
                      highest text–motion cosine similarity across evenly spaced
                      windows. Scores were standardized for each prompt against
                      held-out negative examples. A threshold at the 95th
                      percentile of scores on real HumanML3D motions of other
                      actions gave a 5% empirical false-positive rate on those
                      calibration examples.
                    </p>
                  ),
                },
                {
                  title: "Check order and completion",
                  content: (
                    <p>
                      The positions of the similarity peaks determined action
                      order. A sequence counted as successful only when every
                      action was detected in its assigned interval and the peaks
                      followed the requested order.
                    </p>
                  ),
                },
              ]}
            />

            <h3 className="mt-10 text-2xl font-semibold text-ink">
              Tools and data
            </h3>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <strong>
                  <a
                    className="text-[#cb4900] hover:text-accent transition hover:underline hover:underline-offset-4"
                    target="none"
                    href="https://github.com/GuyTevet/CLoSD"
                  >
                    CLoSD&apos;s DiP
                  </a>
                  :&nbsp;
                </strong>
                the existing motion generator used for the prompting and timing
                experiments presented here.
              </li>
              <li>
                <strong>
                  <a
                    className="text-[#cb4900] hover:text-accent transition hover:underline hover:underline-offset-4"
                    target="none"
                    href="https://github.com/EricGuo5513/HumanML3D"
                  >
                    HumanML3D
                  </a>
                  :&nbsp;
                </strong>{" "}
                real human motion examples used to calibrate the evaluator.
              </li>
              <li>
                <strong className="text-ink">Python and PyTorch:</strong> tools
                used to run the model and experiments.
              </li>
            </ul>

            <div className={`my-15 ${wideMedia}`}>
              <h4
                id="prompt-table-heading"
                className="mb-2 text-center text-2xl font-semibold text-ink"
              >
                Behavior prompts and evaluation sets
              </h4>
              <p className="mb-3 text-sm md:hidden">
                Scroll sideways to see all columns.
              </p>
              <div
                role="region"
                aria-labelledby="prompt-table-heading"
                tabIndex={0}
                className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <table className="w-full min-w-[48rem] border-collapse text-left text-base leading-6">
                  <caption className="sr-only">
                    Table 1. Prompts, real single-behavior test counts, and
                    evaluation-set membership.
                  </caption>
                  <thead className="border-y border-line text-sm font-semibold text-ink">
                    <tr>
                      <th scope="col" className="py-3 pr-6">
                        Behavior
                      </th>
                      <th scope="col" className="py-3 pr-6">
                        Prompt
                      </th>
                      <th scope="col" className="py-3 pr-6 text-right">
                        Real <i>n</i>
                      </th>
                      <th scope="col" className="py-3">
                        Set
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {promptRows.map((row) => (
                      <tr
                        key={row.behavior}
                        className="border-b border-line even:bg-line/30"
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap py-3 pr-6 font-medium text-ink"
                        >
                          {row.behavior}
                        </th>
                        <td className="py-3 pr-6">{row.prompt}</td>
                        <td className="py-3 pr-6 text-right tabular-nums">
                          {row.realN}
                        </td>
                        <td className="whitespace-nowrap py-3">{row.set}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-sm leading-6">
                Real <i>n</i> counts real HumanML3D examples. Both means the
                full calibrated set and the restricted ordering check; Full
                means the full set only. Excluded had too few examples for
                calibration, and Control was used for calibration only.
              </p>
            </div>

            <h3 className="mt-10 text-2xl font-semibold text-ink">
              Measurement limits
            </h3>
            <p className="mt-4">
              Jumping jacks and cartwheels had too few real examples for
              calibration, leaving 280 evaluable four-action cases in the
              three-second comparison. The evaluator also misses some squats and
              turns even in real motion, so completion may be undercounted. Each
              action used one fixed phrase, and these tests do not measure
              physics-based execution.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="results"
          className="w-full px-6 py-10 lg:px-12 xl:px-20"
        >
          <h2
            id="results"
            className="text-center scroll-mt-24 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Results
          </h2>
          <div className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-charcoal">
            <p>
              We used a motion evaluator to check whether each requested action
              was detected in its assigned time interval and whether the
              best-matching moments followed the requested order. A sequence
              counted as successful only when every action was detected in its
              interval and those moments were in order.
            </p>

            <h3 className="mt-10 text-2xl font-semibold text-ink">
              Giving each action its own prompt improved order
            </h3>
            <p className="mt-4">
              With three seconds per action in four-action sequences, one prompt
              for the whole request put 52.3% of action pairs in the requested
              order, close to the 50% chance baseline. Giving a new prompt at
              each action boundary raised that figure to 78%. The complete order
              appeared in 5.0% of sequences with one prompt and 37.9% with
              separate prompts. Detection in the assigned interval also rose
              from 27.3% to 50.5% of individual action slots.
            </p>
            <p className="mt-4">
              Ordering alone was not enough: none of the 280 evaluable
              four-action sequences with one prompt had every action detected in
              its assigned interval and in order. Five of 280 sequences met both
              conditions with separate prompts.
            </p>
            <figure className={`my-15 ${wideMedia}`}>
              <img
                src="/images/order-of-three.png"
                className={imageStyles}
                alt="Three charts compare one prompt with prompts at action boundaries for two to four actions: pairwise order, full order, and detection within assigned intervals."
              />
              <figcaption className="mx-auto mt-3 max-w-3xl text-sm leading-6">
                Figure 2. At three seconds per action, a new prompt at each
                boundary improved ordering and detection in the assigned
                intervals. Dashed lines in the order charts mark chance.
              </figcaption>
            </figure>

            <h3 className="mt-10 text-2xl font-semibold text-ink">
              More time helped overall, then gains leveled off
            </h3>
            <p className="mt-4">
              In a separate test using a new prompt at each boundary, complete,
              correctly ordered four-action sequences rose from 0% with 2.5
              seconds per action to 16% with six seconds. The rate stayed at 16%
              with eight seconds. For two-action sequences, it rose from 15.2%
              at 2.5 seconds to 43.5% at eight seconds. Rates did not rise at
              every tested duration. Even with more time, most four-action
              requests did not pass the full test.
            </p>
            <p className="mt-4">
              In a separate single-action timing check, generated movement began
              about 0.6 seconds after an interval started in the median case,
              leaving less of a short interval for the requested action. This
              measures the start of movement, not the exact moment the named
              action began.
            </p>
            <figure className={`my-15 ${wideMedia}`}>
              <img
                className={imageStyles}
                src="/images/sequence-success.png"
                alt="Three charts show sequence success, mean and median movement onset, and observed all-action detection relative to a prediction from single-action rates as time per action increases."
              />
              <figcaption className="mx-auto mt-3 max-w-3xl text-sm leading-6">
                Figure 3. Longer intervals improved complete, ordered sequences
                overall. The middle chart measures the start of movement; the
                right compares how often all actions were detected with a
                prediction from single-action detection rates.
              </figcaption>
            </figure>

            <h3 className="mt-10 text-2xl font-semibold text-ink">
              How to read these results
            </h3>
            <p className="mt-4">
              Our detector missed some actions even in real motion: it
              recognized only 8.1% of squats and 18.7% of turns in the real
              examples of those actions. It may therefore undercount completed
              generated sequences. A check using more reliably detected actions
              still favored separate prompts for two- and three-action requests,
              but had too few four-action cases to confirm that comparison.
              These findings describe one unchanged motion planner, using one
              phrase per action, before physics-based tracking.
            </p>
            <figure className={`mt-15 ${wideMedia}`}>
              <img
                src="/images/action-detector-sensitivity.png"
                alt="Left chart compares average text-motion similarity on real and generated clips across prompts. Right chart shows detection rates on real motion, with turn and squat below 25%."
                className={imageStyles}
              />
              <figcaption className="mx-auto mt-3 max-w-3xl text-sm leading-6">
                Figure 4. Average text–motion similarity varies by prompt on
                real and generated clips (left), and detection rates on real
                motion vary by action (right). The dashed 25% line marks the
                cutoff for the restricted ordering check.
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          aria-labelledby="motion-examples"
          className="w-full px-6 py-10 lg:px-12 xl:px-20"
        >
          <h2
            id="motion-examples"
            className="text-center scroll-mt-24 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Motion Examples
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-charcoal">
            See how the planner turns written instructions into movement. These
            choices will let you compare prompting and timing approaches once
            the individual clips are ready. For now, every choice shows the same
            preview.
          </p>

          <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-[13rem_minmax(0,42rem)] md:justify-center md:gap-8 lg:grid-cols-[16rem_minmax(0,42rem)] lg:gap-12">
            <div>
              <label
                htmlFor="example-choice"
                className="mb-2 block  text-sm font-semibold text-ink md:hidden"
              >
                Choose a motion example
              </label>
              <select
                id="example-choice"
                value={selectedExample}
                onChange={(event) => setSelectedExample(event.target.value)}
                className="min-h-11 w-full rounded-xl border border-line bg-canvas px-4 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
              >
                {exampleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div className="hidden md:block">
                <p className="mb-3 text-sm font-semibold text-ink">
                  Choose a motion example
                </p>
                <div className="flex flex-col gap-1">
                  {exampleOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={selectedExample === option}
                      onClick={() => setSelectedExample(option)}
                      className={`min-h-11 rounded-xl px-4 py-3 text-left text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                        selectedExample === option
                          ? "bg-ink text-canvas"
                          : "text-charcoal hover:bg-line/50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <figure className="">
              <div className="max-w-2xl overflow-hidden rounded-2xl bg-ink">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="Motion generation preview clip"
                  className="h-full w-full object-contain"
                >
                  <source src="/preview-clip.webm" type="video/webm" />
                  Your browser does not support this video.
                </video>
              </div>
              <figcaption className="mt-4 max-w-2xl text-sm leading-6 text-charcoal">
                <span className="font-semibold text-ink">
                  {selectedExample}
                </span>
                <span> · Preview clip shown for every choice.</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          aria-labelledby="acknowledgements"
          className="w-full px-6 py-16 lg:px-12 xl:px-20"
        >
          <h2
            id="acknowledgements"
            className="text-center scroll-mt-24 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Acknowledgements
          </h2>
          <h3 className="mt-10 text-center text-xl font-semibold text-ink">
            Senior project group
          </h3>
          <ul
            role="list"
            className="mx-auto mt-6 mb-12 grid max-w-3xl gap-6 text-center text-lg font-medium md:grid-cols-2 xl:grid-cols-4"
          >
            <li>Laynie Avila</li>
            <li>Victor Munoz</li>
            <li>Carlos Torres</li>
            <li>Jose Ramos</li>
          </ul>
          <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-8 text-charcoal">
            We'd like to thank the Machine Intelligence Lab at UTRGV, especially
            our advisors, for their guidance and support.
          </p>
          <ul
            role="list"
            className="mt-10 max-w-3xl mx-auto grid gap-6 text-center text-lg font-medium md:grid-cols-2 xl:grid-cols-4"
          >
            <li>Dr. Erik Enriquez</li>
            <li>Dr. Dong-Chul Kim</li>
            <li>Daniel Masamba</li>
            <li>Christian Narcia</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
