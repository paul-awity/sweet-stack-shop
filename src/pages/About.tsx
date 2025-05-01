
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Users } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-24 flex-1">
        {/* Hero Section */}
        <div className="bg-chocolate-50 py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Sweet Story</h1>
              <p className="text-lg text-gray-700">
                At Sweet Stack, we believe that every cake tells a story and every bite creates a memory.
                Our journey began with a passion for baking and a dream to share joy through delicious creations.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="container px-4 mx-auto py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">How It All Started</h2>
              <p className="text-gray-700 mb-4">
                Sweet Stack was born in 2015 when our founder, Sarah Johnson, decided to turn her lifelong passion for baking into a business. 
                What started as weekend cake sales at the local farmers' market quickly grew into a beloved local bakery.
              </p>
              <p className="text-gray-700 mb-4">
                From day one, we've been committed to using only the finest ingredients. Every cake is handcrafted with care, 
                attention to detail, and a sprinkle of love. We believe that quality ingredients make quality cakes, 
                which is why we source locally whenever possible.
              </p>
              <p className="text-gray-700">
                Today, Sweet Stack has grown into a team of passionate bakers and decorators, each bringing their unique touch to our creations. 
                While we've expanded, our commitment to quality, taste, and customer satisfaction remains at the heart of everything we do.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden h-[400px] bg-cream-100">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Bakery image will be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="bg-cream-50 py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-full bg-cake-100 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-cake-500 text-2xl">✦</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-center mb-4">Quality Ingredients</h3>
                  <p className="text-gray-600 text-center">
                    We believe in using only the finest ingredients. From locally sourced butter to premium chocolate, 
                    quality is never compromised.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-full bg-cake-100 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-cake-500 text-2xl">♥</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-center mb-4">Handcrafted with Love</h3>
                  <p className="text-gray-600 text-center">
                    Every cake is made by hand with attention to detail and a passion for perfection. 
                    We put love into every step of the baking process.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-full bg-cake-100 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-cake-500 text-2xl">✿</span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-center mb-4">Community First</h3>
                  <p className="text-gray-600 text-center">
                    We believe in giving back to our community through partnerships with local charities and sustainable sourcing practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Meet Our Team */}
        <div className="container px-4 mx-auto py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600">
              The talented individuals behind Sweet Stack's delicious creations. Our team combines years of experience, 
              passion for baking, and a commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & Head Baker",
                bio: "Started Sweet Stack with a passion for creating memorable cakes for all occasions."
              },
              {
                name: "Michael Chen",
                role: "Executive Pastry Chef",
                bio: "Trained in Paris, Michael brings global inspiration to our cake designs and flavors."
              },
              {
                name: "Emily Rodriguez",
                role: "Cake Designer",
                bio: "Creates the stunning visual designs that make our cakes as beautiful as they are delicious."
              },
              {
                name: "David Kim",
                role: "Operations Manager",
                bio: "Ensures everything runs smoothly so we can deliver the perfect cake on time, every time."
              },
              {
                name: "Olivia Williams",
                role: "Customer Experience",
                bio: "Dedicated to making your Sweet Stack experience memorable from order to delivery."
              },
              {
                name: "Join Our Team",
                role: "We're Growing!",
                bio: "Passionate about baking? We're always looking for talented individuals to join our team."
              }
            ].map((member, index) => (
              <Card key={index} className="border-none shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <Users className="h-12 w-12 text-gray-400" />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-serif font-semibold mb-1">{member.name}</h3>
                  <p className="text-cake-500 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-chocolate-50 py-16">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  text: "The cake was not only beautiful but absolutely delicious! Everyone at the wedding was asking where we got it from.",
                  name: "Rebecca T.",
                  event: "Wedding"
                },
                {
                  text: "Sweet Stack created the perfect birthday cake for my daughter. The attention to detail was amazing, and the taste was even better!",
                  name: "Marcus L.",
                  event: "Birthday"
                },
                {
                  text: "I've ordered from many bakeries before, but none compare to the quality and service at Sweet Stack. They're now our go-to for every celebration.",
                  name: "Patricia M.",
                  event: "Anniversary"
                }
              ].map((testimonial, index) => (
                <Card key={index} className="border-none shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-cream-500 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.event}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
