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
      <div className="bg-header-pattern bg-cover pt-8">
        <div className="container mx-auto px-4  flex justify-center items-center">
          <h1 className="text-4xl font-bold text-black">About Us</h1>
        </div>
      </div>

      <section className="py-5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="md:order-2 mt-8">
              <Image
                src="/assets/images/about.svg"
                alt="About"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:order-1 ">
              <h2 className="mb-4 text-2xl font-bold">Why Choose Us?</h2>

              <p className="mb-4 pl-6 text-gray-800">
                ELMS also provide a number of benefits for students. For
                example, ELMS allow students to access course materials and
                resources from anywhere, at any time, making education more
                convenient and accessible. They also provide tools for student
                collaboration and communication, which can enhance the learning
                experience and improve student engagement.
              </p>
              <p className="mb-4 pl-6 text-gray-800">
                The COVID-19 pandemic has further highlighted the need for ELMS
                as many educational institutions have had to shift to remote
                learning to keep students and staff safe. ELMS have played a
                vital role in ensuring continuity of education during this time
                by providing a platform for online delivery of classes,
                assignments, and assessments. Overall, the use of ELMS has
                become an essential part of modern education and is expected to
                continue growing in the future
              </p>
              <div className="flex items-center">
                <div className="mr-4">
                  <i className="fas fa-map text-4xl text-primary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="px-6">
        <h3 className="mb-4 text-2xl font-bold">Educational Destination</h3>
        <p className="text-gray-800 pl-5">
        Our e-learning web app serves as a dynamic educational destination, providing a wide range of courses and resources tailored to meet the diverse learning needs of our users. With interactive content, personalized learning pathways, and a vast collection of high-quality courses, our platform offers an engaging and enriching experience for individuals seeking to expand their knowledge and skills from the comfort of their own homes.
        </p>
      </div>
    </div>
  </Main>
);

export default About;
