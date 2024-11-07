import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import AllTickets from "./AllTickets";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Box>
      <Heading mt={16} ml={"30px"} p={"20px"} textAlign={"start"} size={"2xl"}>
        Book Your Bus Tickets
      </Heading>

      <Image
      data-aos="fade-left"
      data-aos-anchor-placement="center-bottom"
      data-aos-duration="3000"
        margin={"auto"}
        height={400}
        src="https://s3.rdbuz.com/web/images/homeV2/AboutUs/rydePop.svg"
        alt=""
      />
      <Link to="/alltickets">
        <Button data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-duration="1200" colorScheme="teal"  variant="outline" marginTop={"20px"}>
          Check For Tickets
        </Button>
      </Link>
      {/* <Image marginTop={"20px"}   src="https://platforms.makemytrip.com/contents/9b482a30-8da2-4116-8009-36fddfdd075b" alt=""/> */}
    </Box>
  );
};

export default Home;
