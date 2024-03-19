export default function About() {
  return (
    <section className="container grid gap-x-16 bg-sage pb-32 pt-8 md:grid-cols-2">
      <div className="mb-8 flex max-w-lg items-center gap-4 whitespace-nowrap font-sans-wide text-sm uppercase tracking-wide lg:gap-8">
        About ProDPI
        <div className="h-px w-full bg-black" />
      </div>
      <h1 className="row-span-2 mb-16 font-serif text-5xl uppercase text-white lg:text-6xl">
        We believe <span className="lowercase italic">your</span> creative work
        deserves <span className="lowercase italic">to be</span> seen{' '}
        <span className="lowercase italic">and</span> experienced{' '}
        <span className="lowercase italic">as a</span> tangible, printed piece.
      </h1>
      <div className="max-w-lg space-y-4">
        <p className="mb-8 text-lg">
          We’re inspired by all the incredible creative work out there—whether
          it’s a photographer capturing the world from their point of view, a
          painter exploring color and movement, or a designer, illustrator, or
          any other method of creative expression. We believe this work deserves
          more than a simple square on social media. We believe your creative
          work deserves to be seen and experienced as a tangible, printed piece.
          To be held, to be put on display, and admired together.
        </p>
        <p>
          That’s why we’re modernizing traditional printing methods to make
          professional printing available to more people from many creative
          backgrounds. While classic photo and fine art prints are standards in
          the industry, we&apos;re always looking for new materials to work with
          and new ways to print and showcase your work.
        </p>
        <p>
          Across our entire product line, we&apos;re using the absolute best
          commercial printers and machines on the market, and we have some of
          the brightest and most experienced printing experts on staff. Each
          printing process is specifically calibrated to produce the most
          accurate color output across the entire image. From start to finish,
          we take care to make sure that your work is printed and assembled
          properly, with quality checks at each step of the way. We&apos;ll even
          reprint an item if it doesn&apos;t come out right. We want you to love
          your products from the moment you open the box.
        </p>
      </div>
    </section>
  )
}
