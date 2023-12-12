import { Container } from "@/app/components/Container";
import { Redressed } from "next/font/google";
import Link from "next/link";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadw-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div
            className="
          flex
          items-center
          justify-between
          gap-3
          md:gap-0
          "
          >
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl`}
            >
              E-Shop
            </Link>
            <div>Search</div>
            <div
              className="
            flex
            items-center
            gap-8
            md:gap-12
            "
            >
              <div>CartCount</div>
              <div>User Menu</div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export { Navbar };
