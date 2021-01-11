--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE development;
DROP DATABASE production;




--
-- Drop roles
--

DROP ROLE ase;
DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE ase;
ALTER ROLE ase WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md503004ed5e8e2c9c815191f1628b0c5ec';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md53175bce1d3201d16594cebf9d7eb3f9d';






--
-- Databases
--

--
-- Database "template1" dump
--

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "development" dump
--

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

--
-- Name: development; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE development WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE development OWNER TO postgres;

\connect development

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
-- Name: Assign; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Assign" (
    location_id integer NOT NULL,
    table_id integer NOT NULL,
    guest_id integer NOT NULL,
    date_from bigint NOT NULL,
    date_to bigint NOT NULL
);


ALTER TABLE public."Assign" OWNER TO postgres;

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
    name text NOT NULL,
    location_id integer NOT NULL
);


ALTER TABLE public."Tables" OWNER TO postgres;

--
-- Data for Name: Assign; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Assign" (location_id, table_id, guest_id, date_from, date_to) FROM stdin;
\.


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

COPY public."Tables" (id, name, location_id) FROM stdin;
\.


--
-- Name: Assign AssignGuestToTable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Assign"
    ADD CONSTRAINT "AssignGuestToTable_pkey" PRIMARY KEY (location_id, table_id, guest_id);


--
-- Name: Guests Guests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_pkey" PRIMARY KEY (id);


--
-- Name: Locations Locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY (id);


--
-- Name: Tables Tables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tables"
    ADD CONSTRAINT "Tables_pkey" PRIMARY KEY (id);


--
-- Name: Assign fk_guest_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Assign"
    ADD CONSTRAINT fk_guest_id FOREIGN KEY (guest_id) REFERENCES public."Guests"(id);


--
-- Name: Tables fk_location_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tables"
    ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES public."Locations"(id) NOT VALID;


--
-- Name: Assign fk_location_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Assign"
    ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES public."Locations"(id);


--
-- Name: Assign fk_table_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Assign"
    ADD CONSTRAINT fk_table_id FOREIGN KEY (table_id) REFERENCES public."Tables"(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "production" dump
--

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

--
-- Name: production; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE production WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE production OWNER TO postgres;

\connect production

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
-- Name: Assign; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Assign" (
    location_id integer NOT NULL,
    table_id integer NOT NULL,
    guest_id integer NOT NULL,
    date_from bigint NOT NULL,
    date_to bigint NOT NULL
);


ALTER TABLE public."Assign" OWNER TO postgres;

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
    name text NOT NULL,
    location_id integer NOT NULL
);


ALTER TABLE public."Tables" OWNER TO postgres;

--
-- Data for Name: Assign; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Assign" (location_id, table_id, guest_id, date_from, date_to) FROM stdin;
\.


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

COPY public."Tables" (id, name, location_id) FROM stdin;
\.


--
-- Name: Assign AssignGuestToTable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Assign"
    ADD CONSTRAINT "AssignGuestToTable_pkey" PRIMARY KEY (location_id, table_id, guest_id);


--
-- Name: Guests Guests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Guests"
    ADD CONSTRAINT "Guests_pkey" PRIMARY KEY (id);


--
-- Name: Locations Locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY (id);


--
-- Name: Tables Tables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tables"
    ADD CONSTRAINT "Tables_pkey" PRIMARY KEY (id);


--
-- Name: Assign fk_guest_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Assign"
    ADD CONSTRAINT fk_guest_id FOREIGN KEY (guest_id) REFERENCES public."Guests"(id);


--
-- Name: Tables fk_location_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tables"
    ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES public."Locations"(id) NOT VALID;


--
-- Name: Assign fk_location_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Assign"
    ADD CONSTRAINT fk_location_id FOREIGN KEY (location_id) REFERENCES public."Locations"(id);


--
-- Name: Assign fk_table_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Assign"
    ADD CONSTRAINT fk_table_id FOREIGN KEY (table_id) REFERENCES public."Tables"(id);


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

