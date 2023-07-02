import Image from "next/image";
import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";

const About = () => (
  <Main
    meta={
      <Meta
        title="About Us"
        description="Learn more about our e-learning platform"
      />
    }
  >
    <div className="">
      <div className="bg-header-pattern bg-cover py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl text-black font-bold">About Us</h1>
        </div>
      </div>

      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:order-2">
              <Image
                src="/assets/images/about-img.jpg"
                alt="About"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:order-1">
              <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-gray-800 mb-4">
                We are a leading e-learning platform that provides inclusive and
                engaging learning experiences. Our team of educators, designers,
                and tech experts collaborate to deliver innovative learning
                solutions.
              </p>
              <p className="text-gray-800 mb-4">
                Our mission is to make online learning accessible, enjoyable,
                and effective. We are committed to excellence and customer
                satisfaction.
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <i className="fas fa-map text-4xl text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Educational Destination</h3>
                  <p className="text-gray-800">
                    Discover a wide range of educational resources and
                    materials.
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="mr-4">
                  <i className="fas fa-handshake text-4xl text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Collaboration Hub</h3>
                  <p className="text-gray-800">
                    Connect and collaborate with learners and experts from
                    around the world.
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="mr-4">
                  <i className="fas fa-headset text-4xl text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Perpetual Assistance</h3>
                  <p className="text-gray-800">
                    Receive continuous support and assistance throughout your
                    learning journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Main>
);

export default About;
