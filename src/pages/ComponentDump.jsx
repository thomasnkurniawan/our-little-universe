import MainLayout from "../components/layout/MainLayout";
import Container from "../components/atoms/Container";
import Divider from "../components/atoms/Divider";
import Card from "../components/atoms/Card";
import Button from "../components/atoms/Button";
import Reveal from "../components/atoms/Reveal";
import Input from "../components/atoms/Input";
import { Ri24HoursFill } from "@remixicon/react";
import Select from "../components/atoms/Select";

export default function ComponentDump() {
  return (
    <MainLayout>
      <Container className="flex flex-col gap-16">
        {/* PAGE TITLE */}
        <section className="pt-10">
          <h1 className="text-4xl font-bold text-neutral-900">
            Component Dump
          </h1>
          <p className="text-neutral-500 mt-2">
            Starter template playground to preview and copy usage patterns.
          </p>
        </section>

        {/* DIVIDER */}
        <section className="relative py-16">
          <Divider position="top" />
          <Divider position="bottom" />

          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Divider
          </h2>

          <p className="text-neutral-600">
            Divider component for section separators.
          </p>
        </section>

        {/* BUTTONS */}
        <section className="py-16 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-neutral-900">Button</h2>

          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </section>

        {/* CARD */}
        <section className="py-16 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-neutral-900">Card</h2>

          <Card className="max-w-xl">
            <p className="text-lg font-semibold text-neutral-900">Card Title</p>
            <p className="text-neutral-600 mt-2 leading-relaxed">
              This is an example of the Card component. Apple-ish: border,
              subtle shadow, smooth hover.
            </p>

            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="tag">React</span>
              <span className="tag">Tailwind</span>
              <span className="tag">Minimal UI</span>
            </div>
          </Card>
        </section>

        {/* REVEAL */}
        <section className="py-16 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-neutral-900">Reveal</h2>

          <p className="text-neutral-600">
            Scroll down to see fade-in animation.
          </p>

          <div className="flex flex-col gap-4">
            <Reveal>
              <Card className="max-w-xl">
                <p className="text-lg font-semibold text-neutral-900">
                  Reveal Default
                </p>
                <p className="text-neutral-600 mt-2">
                  This fades in with default config.
                </p>
              </Card>
            </Reveal>

            <Reveal delay={200}>
              <Card className="max-w-xl">
                <p className="text-lg font-semibold text-neutral-900">
                  Reveal with Delay
                </p>
                <p className="text-neutral-600 mt-2">
                  This appears 200ms later.
                </p>
              </Card>
            </Reveal>

            <Reveal delay={400} y={40}>
              <Card className="max-w-xl">
                <p className="text-lg font-semibold text-neutral-900">
                  Reveal with Custom Y
                </p>
                <p className="text-neutral-600 mt-2">
                  This slides up more (y=40).
                </p>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* CONTAINER */}
        <section className="py-16 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-neutral-900">Container</h2>

          <p className="text-neutral-600">
            Container ensures consistent max width and centering.
          </p>

          <div className="border border-neutral-200 rounded-2xl p-6 bg-neutral-50">
            <p className="text-neutral-700">This box is inside Container.</p>
          </div>
        </section>

        {/* INPUT */}
        <section className="py-16 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-neutral-900">Input</h2>

          <p className="text-neutral-600">
            Input component with optional icons and border.
          </p>

          <div className="border border-neutral-200 rounded-2xl p-6 bg-neutral-50">
            <Input placeholder="Enter your text here" className="my-3" />
            <Input
              placeholder="Enter your text here"
              preIcon={<Ri24HoursFill />}
              postIcon={<span>hours</span>}
            />
          </div>

          <div className="border border-neutral-200 rounded-2xl p-6 bg-neutral-50">
            <Select placeholder="Select an option" items={[{value: 'option-1', label: 'Option 1'}]} />
          </div>
        </section>

        {/* EXAMPLE SECTION TEMPLATE */}
        <section className="section">
          <Divider position="top" />
          <Divider position="bottom" />

          <Reveal>
            <div className="flex flex-col items-center">
              <h1 className="section-title">Section Template</h1>
              <p className="section-desc">
                This is the recommended structure for every section.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <Card className="max-w-xl text-center">
              <p className="text-neutral-900 font-semibold text-lg">
                Section Content Card
              </p>
              <p className="text-neutral-600 mt-2">
                Put your content here. Always keep spacing clean.
              </p>

              <div className="mt-6">
                <Button variant="primary">Call to Action</Button>
              </div>
            </Card>
          </Reveal>
        </section>
      </Container>
    </MainLayout>
  );
}
