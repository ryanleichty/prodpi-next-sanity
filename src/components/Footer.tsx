import Link from 'next/link'
import Logo from '@/components/Logo'
import { cx } from '@/utils'

type Props = React.ComponentPropsWithoutRef<'footer'>

export default function Footer({ className, ...props }: Props) {
  return (
    <>
      <footer {...props} className={cx('bg-black py-12 text-sand', className)}>
        <div className="container">
          <div className="pb-8">
            <Logo />
          </div>
          <div className="grid gap-8 border-t border-sand/50 py-12 xl:grid-cols-[repeat(auto-fill,200px)]">
            <div>
              <h2 className="mb-4 font-sans-wide">Helpful Info</h2>
              <ul>
                <li>
                  <Link
                    className="inline-block py-0.5"
                    href="/turnaround-times"
                  >
                    Turnaround Times
                  </Link>
                </li>
                <li>
                  <Link className="inline-block py-0.5" href="/shipping">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link className="inline-block py-0.5" href="/psd-guides">
                    PSD Guides
                  </Link>
                </li>
                <li>
                  <Link
                    className="inline-block py-0.5"
                    href="/integrated-partners"
                  >
                    Integrated Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 font-sans-wide">About Us</h2>
              <p>
                We’re making professional printing available to more people from
                many creative backgrounds.
              </p>
              <Link className="block py-0.5" href="/about-us">
                Learn More →
              </Link>
            </div>
            <div>
              <h2 className="mb-4 font-sans-wide">Contact Us</h2>
              <ul>
                <li>
                  <a className="inline-block py-0.5" href="tel:612-324-8692">
                    612-324-8692
                  </a>
                </li>
                <li>
                  <a className="inline-block py-0.5" href="tel:1-855-776-3745">
                    1-855-776-3745
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block py-0.5"
                    href="mailto:support@prodpi.com"
                  >
                    support@prodpi.com
                  </a>
                </li>
              </ul>
            </div>
            <div></div>
          </div>
          <div className="border-t border-sand/50 pt-8 text-sm text-sand/50">
            Copyright 2023 © ProDPI. All rights reserved. Privacy Policy
          </div>
        </div>
      </footer>
    </>
  )
}
