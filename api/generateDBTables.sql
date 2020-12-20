--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Debian 12.2-2.pgdg100+1)
-- Dumped by pg_dump version 12.2 (Debian 12.2-2.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Guests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Guests" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "phoneNumber" text NOT NULL
);


ALTER TABLE public."Guests" OWNER TO postgres;

--
-- Name: Locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Locations" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Locations" OWNER TO postgres;

--
-- Name: Tables; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tables" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Tables" OWNER TO postgres;

--
-- Data for Name: Guests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Guests" (id, name, email, "phoneNumber") FROM stdin;
\.


--
-- Data for Name: Locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Locations" (id, name) FROM stdin;
\.


--
-- Data for Name: Tables; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tables" (id, name) FROM stdin;
\.


--
-- Name: Guests Guests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_pkey" PRIMARY KEY (id);


--
-- Name: Tables Tables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tables"
    ADD CONSTRAINT "Tables_pkey" PRIMARY KEY (id);


--
-- Name: Locations pk_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

