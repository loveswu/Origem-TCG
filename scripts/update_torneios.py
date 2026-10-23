"""Baixa os TCG Cups e Challenges do Brasil (todos os estados) do pokedata.ovh e gera torneios.json."""
import csv, io, json, sys, urllib.parse, urllib.request
from datetime import datetime, timedelta, timezone

URL = "https://www.pokedata.ovh/events/tocsv.php"
BRT = timezone(timedelta(hours=-3))
FORM = {
    "past": "", "country": "BR", "city": "", "shop": "", "league": "",
    "states": json.dumps([]), "postcode": "",
    "cups": "1", "challenges": "1", "vcups": "", "vchallenges": "", "prereleases": "",
    "premier": "", "go": "", "gocup": "", "mss": "", "ftcg": "", "fvg": "", "fgo": "",
    "latitude": "", "longitude": "", "radius": "", "unit": "km",
}


def fetch():
    req = urllib.request.Request(
        URL,
        data=urllib.parse.urlencode(FORM).encode(),
        headers={
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (OrigemTCG weekly update; +https://www.origemtcg.com.br)",
            "Referer": "https://www.pokedata.ovh/events/",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode("utf-8-sig")


WORDS = {
    "Sao": "São", "Andre": "André", "Jundiai": "Jundiaí", "Ribeirao": "Ribeirão",
    "Taubate": "Taubaté", "Guaruja": "Guarujá", "Maua": "Mauá", "Sumare": "Sumaré",
    "Jacarei": "Jacareí", "Marilia": "Marília", "Aracatuba": "Araçatuba", "Jose": "José",
    "Joao": "João", "Braganca": "Bragança", "Paulinia": "Paulínia", "Hortolandia": "Hortolândia",
    "Sertaozinho": "Sertãozinho", "Carapicuiba": "Carapicuíba", "Taboao": "Taboão",
    "Peruibe": "Peruíbe", "Sebastiao": "Sebastião", "Guaratingueta": "Guaratinguetá",
    "Avare": "Avaré", "Tatui": "Tatuí", "Poa": "Poá", "Espirito": "Espírito",
    "Barbara": "Bárbara", "Guacu": "Guaçu", "Mirim": "Mirim", "Itarare": "Itararé",
    "Ubatuba": "Ubatuba", "Itapevi": "Itapevi", "Votorantim": "Votorantim", "Cubatao": "Cubatão",
    "Valinhos": "Valinhos", "Itupeva": "Itupeva", "Louveira": "Louveira", "Caieiras": "Caieiras",
    "Ferraz": "Ferraz", "Vasconcelos": "Vasconcelos", "Aruja": "Arujá", "Jau": "Jaú",
    "Ourinhos": "Ourinhos", "Andradina": "Andradina", "Itatiba": "Itatiba", "Vinhedo": "Vinhedo",
    "Sorocaba": "Sorocaba", "Mococa": "Mococa", "Leme": "Leme", "Limeira": "Limeira",
    "Aguas": "Águas", "Balneario": "Balneário", "Camboriu": "Camboriú", "Belem": "Belém",
    "Goncalves": "Gonçalves", "Goncalo": "Gonçalo", "Brasilia": "Brasília", "Centenario": "Centenário",
    "Criciuma": "Criciúma", "Cuiaba": "Cuiabá", "Divinopolis": "Divinópolis", "Guara": "Guará",
    "Itajuba": "Itajubá", "Maringa": "Maringá", "Mossoro": "Mossoró", "Nilopolis": "Nilópolis",
    "Niteroi": "Niterói", "Iguacu": "Iguaçu", "Palhoca": "Palhoça", "Pocos": "Poços",
    "Quixada": "Quixadá", "Luis": "Luís", "Teresopolis": "Teresópolis", "Tres": "Três",
    "Uba": "Ubá", "Uberlandia": "Uberlândia", "Unai": "Unaí", "Viamao": "Viamão",
    "Vitoria": "Vitória", "Maceio": "Maceió", "Macapa": "Macapá", "Goiania": "Goiânia",
    "Florianopolis": "Florianópolis", "Petropolis": "Petrópolis", "Itajai": "Itajaí",
    "Chapeco": "Chapecó", "Jaragua": "Jaraguá", "Gravatai": "Gravataí", "Macae": "Macaé",
    "Anapolis": "Anápolis", "Ceilandia": "Ceilândia", "Jaboatao": "Jaboatão", "Ilheus": "Ilhéus",
    "Camacari": "Camaçari", "Maracanau": "Maracanaú", "Parnaiba": "Parnaíba",
    "Rondonopolis": "Rondonópolis", "Varzea": "Várzea", "Santarem": "Santarém", "Maraba": "Marabá",
    "Araguaina": "Araguaína", "Sao": "São", "Joinville": "Joinville",
}

UF = {
    "acre": "AC", "alagoas": "AL", "amapa": "AP", "amazonas": "AM", "bahia": "BA", "ceara": "CE",
    "distrito federal": "DF", "espirito santo": "ES", "goias": "GO", "maranhao": "MA",
    "mato grosso": "MT", "mato grosso do sul": "MS", "minas gerais": "MG", "para": "PA",
    "paraiba": "PB", "parana": "PR", "pernambuco": "PE", "piaui": "PI", "rio de janeiro": "RJ",
    "rio grande do norte": "RN", "rio grande do sul": "RS", "rondonia": "RO", "roraima": "RR",
    "santa catarina": "SC", "sao paulo": "SP", "sergipe": "SE", "tocantins": "TO",
}


def uf(name):
    import unicodedata
    k = unicodedata.normalize("NFD", " ".join((name or "").split())).encode("ascii", "ignore").decode().lower()
    return UF.get(k, "")


def city(name):
    return " ".join(WORDS.get(w, w) for w in " ".join(name.split()).split(" "))


def num(x):
    try:
        return round(float(x), 5)
    except (TypeError, ValueError):
        return None


def main(out="torneios.json"):
    text = fetch()
    if not text.startswith("type;"):
        sys.exit("Resposta inesperada do pokedata.ovh: " + text[:200])
    today = datetime.now(BRT).strftime("%Y-%m-%d")
    events = []
    for row in csv.DictReader(io.StringIO(text), delimiter=";"):
        kind = (row.get("type") or "").lower()
        if "cup" in kind:
            t = "Cup"
        elif "challenge" in kind:
            t = "Challenge"
        else:
            continue
        if (row.get("country_code") or "").upper() != "BR":
            continue
        estado = uf(row.get("state"))
        if not estado:
            continue
        when = (row.get("when") or row.get("date") or "").strip()
        if when[:10] < today:
            continue
        events.append({
            "t": t,
            "n": (row.get("name") or "").strip(),
            "w": when[:16],
            "s": " ".join((row.get("shop") or "").split()),
            "a": " ".join((row.get("street_adress") or "").split()),
            "e": estado,
            "c": city(row.get("city") or ""),
            "u": (row.get("pokemon_url") or "").strip(),
            "la": num(row.get("latitude")),
            "lo": num(row.get("longitude")),
        })
    events.sort(key=lambda e: (e["w"], e["e"], e["c"], e["s"]))
    if not events:
        sys.exit("Nenhum evento encontrado, mantendo o arquivo anterior.")
    data = {
        "atualizado": datetime.now(BRT).strftime("%Y-%m-%dT%H:%M"),
        "fonte": "pokedata.ovh",
        "eventos": events,
    }
    with open(out, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    cups = sum(e["t"] == "Cup" for e in events)
    ufs = sorted({e["e"] for e in events})
    print(f"{len(events)} eventos ({cups} Cups, {len(events) - cups} Challenges) em {len(ufs)} estados: {' '.join(ufs)}")


if __name__ == "__main__":
    main(*sys.argv[1:])
