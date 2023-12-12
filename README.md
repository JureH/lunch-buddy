# LunchBuddy - DevOps Akademija lastni projekt

## Opis aplikacije

LunchBuddy je spletna aplikacija, ki omogoča dogovarjanje med sodelavci v podjetju kdaj in kam bi šli na malico. Uporabnik lahko vsak dan označi kdaj ima čas in v katero restavracijo bi šel. Aplikacija prijavljenim uporabnikom prikazuje seznam restavracij, ki so bile izbrane za tekoči dan in število ljudi, ki bi šlo na to lokacijo ob določeni uri. Lokacije so označene tudi na zemljevidu. Možen je tudi pogovor med uporabniki ter dodajanje in komentiranje restavracij. 

## Tipi uporabnikov
- **Neprijavljen uporabnik** - lahko vidi osnovno stran, ne more dodajati restavracij, glasovati ali komentirati
- **Prijavljen uporabnik** - lahko uporablja stran, vidi izbiro sodelavcev, dodaja nove restavracije, klepeta z ostalimi uporabniki, oddaja komentarje
- **Administrator** - poleg pravic, ki jih ima prijavljen uporabnik lahko administrator tudi odstrani uporabnike, restavracije, komentarje

## Trenutno stanje aplikacije
- Omogočena je prijava in registracija uporabnikov
- Možno je dodajati komentarje na restavracije.
- Možno je brisati svoje komentarje, admin lahko briše vse
- Ustvarjene so vse podstrani z manjkajočimi funkcionalnostmi

## Manjkajoče funkcionalnosti
- Dodajanje novih restavracij (Google places API)
- Prikaz lokacij restavracij na zemljevid
- Možnost izbire lokacije za uporabnike
- Dodajanje sporočil v klepet

## Virtualizacija aplikacije s cloud init na AWS

- Zaženemo novo instanco EC2 na AWS Cloud in jo poimenujemo

![Screenshot 1](docs/screenshots/1_name.png)

- Izberemo Ubuntu Server 22.04 LTS

![Screenshot 2](docs/screenshots/2_os.png)

- Izberemo tip instance t3.small (2 CPU, 2GiB Memory)

![Screenshot 3](docs/screenshots/3_type.png)

- Generiramo par ključev za ssh dostop

![Screenshot 3](docs/screenshots/4_create_key_pair.png)

- Izberemo ključ

![Screenshot 5](docs/screenshots/5_select_key_pair.png)

- Izberemo security group

![Screenshot 6](docs/screenshots/6_select_security.png)

- Inbound nastavitve

![Screenshot 7](docs/screenshots/7_inbound.png)

- Outbound nastavitve

![Screenshot 8](docs/screenshots/8_outbound.png)

- Izberemo storage

![Screenshot 9](docs/screenshots/9_storage.png)

- V user data vstavimo vsebino datoteke cloud-init.yml, ki se nahaja v rootu repositorija

![Screenshot 10](docs/screenshots/10_cloud_init.png)

- Zaženemo virtualko
![Screenshot 11](docs/screenshots/11_launch.png)

- Po zagunu vidimo lastnosti virtualke

![Screenshot 12](docs/screenshots/12_povzetek.png)

- Prek AWS se povežemo na instanco

![Screenshot 13](docs/screenshots/13_connect.png)

- Pogledamo cloud init log in vidimo da se je izvedel

![Screenshot 14](docs/screenshots/14_cloud_init_success.png)

- Pogledamo log express serverja in vidimo, da se je postavil

![Screenshot 15](docs/screenshots/15_express_api_server_success.png)

- Pogledamo log angular aplikacije in vidimo da se je uspešno zagnala

![Screenshot 16](docs/screenshots/16_angular_success.png)

- Ustvarimo ssh tunel na ip virtualke za port 4200 in 3000

![Screenshot 17](docs/screenshots/17_ssh_tunel_4200.png)

![Screenshot 18](docs/screenshots/18_ssh_tunel_3000.png)

- Do API serverja dostopamo na localhost:3000

![Screenshot 19](docs/screenshots/19_api.png)

- Do angular aplikacije dostopamo na localhost:4200

![Screenshot 20](docs/screenshots/20_angular_app.png)


## Kaj naredi cloud-init?

- doda repositorij za mongoDB in ga namesti
- namesti nodejs
- prenese aplikacijo iz gita
- z NPM namesti vse odvisne knjižnjice, ki jih potrebujemo za API strežnik
- zažene mongo bazo in vstavi začetne podatke iz json datotek
- izbriše datoteke z začetnimi podatki
- zažene API strežnik v ozadju dostopen na localhost:3000
- namesti vse odvisne knjižnjice za Angular aplikacijo
- zažene Angular aplikacijo dostopno na localhost:4200

## Ustvarjeni uporabniki

**Administrator:**

email: admin@website.net

geslo: admin

**Prijavljen uporabnik:**

email: user@website.net

geslo: user
