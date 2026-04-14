import { useRef, useState } from "react";
import { useGsap, gsap } from "../../hooks/useGsap";
import { CONTACT } from "../../constants/content";
import { defaultScrollTrigger } from "../../utils/animations";
import MagneticButton from "../ui/MagneticButton";
import { Send } from "lucide-react";

export default function Contact() {
  const headlineRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useGsap(() => {
    // Letter-by-letter headline reveal
    const chars = headlineRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
        stagger: 0.03,
        scrollTrigger: defaultScrollTrigger(headlineRef.current),
      }
    );

    // Staggered form fields
    const fields = formRef.current.querySelectorAll(".form-field");
    gsap.fromTo(
      fields,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: defaultScrollTrigger(formRef.current),
      }
    );
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  }

  const headlineChars = CONTACT.headline.split("");

  return (
    <section
      id="contact"
      className="bg-midnight px-6 py-24 md:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          ref={headlineRef}
          className="font-display text-5xl font-bold md:text-6xl lg:text-7xl"
        >
          {headlineChars.map((char, i) => (
            <span key={i} className="char inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h2>

        <p className="mt-6 font-body text-lg text-gray">
          {CONTACT.description}
        </p>

        {submitted ? (
          <div className="mt-12 rounded-2xl border border-lime/20 bg-midnight-light p-12">
            <p className="font-display text-2xl text-lime">Thank you!</p>
            <p className="mt-2 font-body text-gray">
              We'll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-6 text-left"
          >
            <div className="form-field">
              <label
                htmlFor="name"
                className="mb-2 block font-body text-sm text-gray"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-midnight-light px-4 py-3 font-body text-white outline-none transition-colors focus:border-lime"
                placeholder="Your name"
              />
            </div>

            <div className="form-field">
              <label
                htmlFor="email"
                className="mb-2 block font-body text-sm text-gray"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-midnight-light px-4 py-3 font-body text-white outline-none transition-colors focus:border-lime"
                placeholder="your@email.com"
              />
            </div>

            <div className="form-field">
              <label
                htmlFor="message"
                className="mb-2 block font-body text-sm text-gray"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full resize-none rounded-xl border border-white/10 bg-midnight-light px-4 py-3 font-body text-white outline-none transition-colors focus:border-lime"
                placeholder="Tell us about your startup..."
              />
            </div>

            <div className="form-field flex justify-center pt-4">
              <MagneticButton type="submit">
                <Send size={18} />
                Let's Talk
              </MagneticButton>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
