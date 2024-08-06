"use client";
import HomeHook from "@/components/home/hook/HomeHook";
import Spinner from "@/components/spinner/Spinner";
import { Fragment } from "react";
import { Container } from "react-bootstrap";
import Seo from "shared/layout-components/seo/seo";
import Header from "../header/Header";

const Home = () => {
    const { isLoading } = HomeHook();

    return isLoading ? (
        <Spinner />
    ) : (
        <Fragment>
            <Seo title={"Home"} />
            <Container
                fluid
                className="tw-px-10 dark:bg-black dark:tw-bg-repeat tw-mt-14"
            >
                <Container fluid className="tw-px-20">
                    <Header />
                </Container>
            </Container>
        </Fragment>
    );
};

export default Home;
