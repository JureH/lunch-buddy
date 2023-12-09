# LunchBuddy - DevOps Akademija lastni projekt

## Opis aplikacije

LunchBuddy je spletna aplikacija, ki omogoča dogovarjanje med sodelavci v podjetju kdaj in kam bi šli na malico. Uporabnik lahko vsak dan označi kdaj ima čas in v katero restavracijo bi šel. Aplikacija prijavljenim uporabnikom prikazuje seznam restavracij, ki so bile izbrane za tekoči dan in število ljudi, ki bi šlo na to lokacijo ob določeni uri. Lokacije so označene tudi na zemljevidu. Možen je tudi pogovor med uporabniki, komentiranje in ocenjevanje restavracij. 

## Zaslonske maske
- [Login](/docs/login.html) Pogled kjer se uporabnik prijavi v aplikacijo.
- [Registration](/docs/registration.html) Pogled za registracijo novega uporabnika.
- [Main page](/docs/index.html) Pogled kjer je na vrhu seznam izbranih restavracij za trenutni dan in število ljudi, ki jo je izbralo. Seznam je možno filtrirati glede na časovni okvir. Ob kliku na restavracijo se pojavijo podrobnejše informacije o restavraciji. Ob kliku na število ljudi pokaže imena ljudi, ki so izbrali to restavracijo. Pod seznamom je zemljevid kjer so označene te restavracije na zemljevidu. Pod zemljevidom je chat med uporabniki.
- [List of restaurants](/docs/list_restaurants.html) Pogled kjer so navedene vse restavracije z osnovnimi informacijami. Na vrhu je iskalnik, ki filtrira restavracije. Ob kliku na restavracijo se pojavijo podrobnejše informacije o restavraciji.
- [Add restaurant](/docs/add_restaurant.html) Pogled kjer uporabnik lahko dodaja restavracije. Ob vnosu imena se apilkacija poveže na Google Places API in ponudi možnosti. Ko uporabnik izbere možnost se doda restavracijo na seznam skupaj s podatki pridobljenimi iz API-ja.
- [Restaurant](/docs/restaurant.html) Pogled kjer so podrobne informacije o restavraciji in komentarji uporabnikov. 
- [Admin panel](/docs/admin_page.html) Pogled kjer administrator lahko ureja in odstranjuje uporabnike, restavracije, komentarje.


## Tipi uporabnikov
- **Neprijavljen uporabnik** - lahko vidi osnovno stran, ne more dodajati restavracij, glasovati ali komentirati
- **Prijavljen uporabnik** - lahko uporablja stran, vidi izbiro sodelavcev, dodaja nove restavracije, klepeta z ostalimi uporabniki, oddaja komentarje
- **Administrator** - poleg pravic, ki jih ima prijavljen uporabnik lahko administrator tudi odstrani uporabnike, restavracije, komentarje

## Povezava do predstavitve

[Google presentation link](https://docs.google.com/presentation/d/1GNJgRIxggiAauJ3ZjBR1sygoK6rlpgJPArJ1MX7-_cI/edit?usp=sharing)

## Povezava do aplikacije

[render link](https://test-xzc6.onrender.com)

## Lokalni zagon aplikacije (docker)

Server in lokalno bazo zaženemo z ukazom "docker-compose up".

Za zagon angular spletne strani se premaknemo v mapo angular in zaženemo ukaz "ng serve".

Stran je dostopna na [localhost:4200/]

## Ustvarjeni uporabniki

**Administrator:**

email: admin@website.net

geslo: admin

**Prijavljen uporabnik:**

email: user@website.net

geslo: user
