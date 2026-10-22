/**
 * Figures on drums: each digit is a strip of 0–9 clipped to one figure, so a
 * change rolls through the numbers in between, like an odometer. The
 * rightmost digit moves first and the ones to its left follow.
 *
 * Purely visual — whoever renders it supplies the value to assistive
 * technology. Characters that are not digits (a comma, a decimal point) sit
 * still between the drums. Use tabular figures on the parent so every drum is
 * the same width.
 */

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

/** Delay between neighbouring drums, as on a meter. */
const STAGGER = 90;

export function Odometer({ value }) {
  const chars = [...String(value)];
  return chars.map((ch, i) =>
    /\d/.test(ch) ? (
      <span key={i} aria-hidden="true" className="odometer-wheel">
        {/* In-flow sizer: gives the drum its width, height and baseline. */}
        <span className="invisible">0</span>
        <span
          className="odometer-strip"
          style={{ '--digit': ch, '--wheel-delay': `${(chars.length - 1 - i) * STAGGER}ms` }}
        >
          {DIGITS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </span>
      </span>
    ) : (
      <span key={i} aria-hidden="true">
        {ch}
      </span>
    )
  );
}

export default Odometer;
