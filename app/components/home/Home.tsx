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
                className="tw-px-0 bg-home lg:tw-px-10 tw-bg-white tw-bg-opacity-10 tw-mt-14 tw-min-h-screen"
            >
                <Header />
            </Container>
        </Fragment>
    );
};

export default Home;
