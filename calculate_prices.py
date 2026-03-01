import json

PRICES = {
    "perfuracao": {
        "paranagua": 600,
        "pontal": 750,
        "matinhos": 750,
        "guaratuba": 1250,
    },
    "manutencao": {
        "paranagua": 300,
        "pontal": 400,
        "matinhos": 400,
        "guaratuba": 600,
    },
    "motorCasa": {
        "paranagua": 500,
        "pontal": 500,
        "matinhos": 500,
        "guaratuba": 500,
    },
    "motorSobrado": {
        "paranagua": 600,
        "pontal": 600,
        "matinhos": 600,
        "guaratuba": 600,
    },
    "filtro": {
        "paranagua": 250,
        "pontal": 250,
        "matinhos": 250,
        "guaratuba": 250,
    },
    "pressurizador": {
        "paranagua": 650,
        "pontal": 650,
        "matinhos": 650,
        "guaratuba": 650,
    },
    "valvula": {
        "paranagua": 150,
        "pontal": 150,
        "matinhos": 150,
        "guaratuba": 150,
    },
    "motor05": {
        "paranagua": 650,
        "pontal": 650,
        "matinhos": 650,
        "guaratuba": 650,
    },
    "motor08": {
        "paranagua": 1050,
        "pontal": 1050,
        "matinhos": 1050,
        "guaratuba": 1050,
    },
    "motor15": {
        "paranagua": 1350,
        "pontal": 1350,
        "matinhos": 1350,
        "guaratuba": 1350,
    },
    "refilFiltro": {
        "paranagua": 100,
        "pontal": 100,
        "matinhos": 100,
        "guaratuba": 100,
    }
}

SERVICE_TYPES = ["perfuracao", "manutencao"]
CITIES = ["paranagua", "pontal", "matinhos", "guaratuba"]
DEPTHS = list(range(6, 19)) # 6m to 18m
MOTOR_TYPES = [None, "0.5", "0.8", "1.5"]
EXTRAS_OPTIONS = [
    "filtro", "pressurizador", "valvula", "refilFiltro"
]

def calculate_price(
    service_type,
    city,
    depth,
    motor_type,
    extras_selected
):
    base_price = PRICES[service_type].get(city, 0)

    depth_price = 0
    if service_type == "perfuracao" and depth > 12:
        depth_price = (depth - 12) * 50

    extras_price = 0
    for extra_key in extras_selected:
        extras_price += PRICES[extra_key].get(city, 0)

    motor_price = 0
    if motor_type:
        motor_key = f"motor{motor_type.replace('.', '')}"
        motor_price = PRICES[motor_key].get(city, 0)

    return base_price + depth_price + extras_price + motor_price

all_combinations = []

for service_type in SERVICE_TYPES:
    for city in CITIES:
        for depth in DEPTHS:
            if service_type == "manutencao" and depth != 12: # Depth only applies to perfuracao
                continue

            for motor_type in MOTOR_TYPES:
                # Iterate through all combinations of extras
                for i in range(2**len(EXTRAS_OPTIONS)):
                    selected_extras = []
                    for j in range(len(EXTRAS_OPTIONS)):
                        if (i >> j) & 1:
                            selected_extras.append(EXTRAS_OPTIONS[j])

                    # Handle mutually exclusive motorCasa/motorSobrado
                    for motor_install_option in [None, "motorCasa", "motorSobrado"]:
                        current_extras = list(selected_extras)
                        if motor_install_option:
                            current_extras.append(motor_install_option)

                        # Ensure motorCasa and motorSobrado are not both selected
                        if "motorCasa" in current_extras and "motorSobrado" in current_extras:
                            continue

                        price = calculate_price(
                            service_type,
                            city,
                            depth,
                            motor_type,
                            current_extras
                        )

                        combination = {
                            "service_type": service_type,
                            "city": city,
                            "depth": depth if service_type == "perfuracao" else "N/A",
                            "motor_type": motor_type if motor_type else "Nenhum",
                            "extras": ", ".join(current_extras) if current_extras else "Nenhum",
                            "price": price
                        }
                        all_combinations.append(combination)

# Sort combinations for better readability
all_combinations.sort(key=lambda x: (x["service_type"], x["city"], x["depth"], x["price"]))

# Generate Markdown table
markdown_table = "| Tipo de Serviço | Cidade | Profundidade (m) | Tipo de Motor | Extras | Preço (R$) |\n"
markdown_table += "|---|---|---|---|---|---|\n"

for combo in all_combinations:
    markdown_table += f"| {combo['service_type'].capitalize()} | {combo['city'].capitalize()} | {combo['depth']} | {combo['motor_type']} | {combo['extras']} | {combo['price']:,.2f} |\n"

with open("/home/ubuntu/litoral-pocos/pricing_combinations.md", "w", encoding="utf-8") as f:
    f.write(markdown_table)

print("Tabela de preços gerada em pricing_combinations.md")
