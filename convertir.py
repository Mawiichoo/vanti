# -*- coding: utf-8 -*-
"""
VANTI PORTFOLIO DASHBOARD - BULK IMPORT PYTHON UTILITY (CSV -> JSON)
==================================================================
Este script lee el archivo 'backlog_carga_masiva.csv' y genera
el archivo 'data.json' listo para ser consumido por el dashboard.

Uso:
    python convertir.py
"""

import csv
import json
import os
import sys

def parse_csv(csv_path):
    projects = {}
    epics = {}
    hus = []

    # Abrir con UTF-8 para soportar tildes y caracteres especiales en español
    with open(csv_path, mode='r', encoding='utf-8') as f:
        # Detectar delimitador si es punto y coma (Excel en español suele usar ;) o coma
        sample = f.read(2048)
        f.seek(0)
        delimiter = ';' if ';' in sample else ','
        
        reader = csv.DictReader(f, delimiter=delimiter)
        for row_idx, row in enumerate(reader, 1):
            proj_code = row.get('ProjectCode')
            if not proj_code:
                # Omitir filas vacías
                continue

            # 1. Parsear Proyecto
            proj_code = proj_code.strip()
            if proj_code not in projects:
                projects[proj_code] = {
                    "id": proj_code,
                    "name": (row.get('ProjectName') or proj_code).strip(),
                    "code": proj_code,
                    "desc": (row.get('ProjectDesc') or '').strip(),
                    "plannedStartDate": (row.get('ProjectPlannedStart') or '2026-07-01').strip(),
                    "plannedEndDate": (row.get('ProjectPlannedEnd') or '2026-12-31').strip(),
                    "actualStartDate": (row.get('ProjectActualStart') or '2026-07-01').strip(),
                    "actualEndDate": (row.get('ProjectActualEnd') or '2026-12-31').strip()
                }

            # 2. Parsear Épica
            epic_id = row.get('EpicId')
            if epic_id:
                epic_id = epic_id.strip()
                if epic_id not in epics:
                    epics[epic_id] = {
                        "id": epic_id,
                        "projectId": proj_code,
                        "name": (row.get('EpicName') or epic_id).strip(),
                        "desc": (row.get('EpicDesc') or '').strip(),
                        "plannedStartDate": (row.get('EpicPlannedStart') or '2026-07-01').strip(),
                        "plannedEndDate": (row.get('EpicPlannedEnd') or '2026-12-31').strip(),
                        "actualStartDate": (row.get('EpicActualStart') or '2026-07-01').strip(),
                        "actualEndDate": (row.get('EpicActualEnd') or '2026-12-31').strip()
                    }

            # 3. Parsear Historia de Usuario (HU)
            hu_id = row.get('HUId')
            if hu_id:
                hu_id = hu_id.strip()
                
                # Criterios de Aceptación (delimitados por pipe |)
                ac_list = []
                ac_raw = row.get('AcceptanceCriteria') or ''
                if ac_raw:
                    ac_items = [item.strip() for item in ac_raw.split('|') if item.strip()]
                    for idx, ac_text in enumerate(ac_items):
                        ac_list.append({
                            "id": f"{hu_id}-AC-{idx+1:02d}",
                            "text": ac_text,
                            "completed": False,
                            "plannedStartDate": (row.get('HUPlannedStart') or '2026-07-01').strip(),
                            "plannedEndDate": (row.get('HUPlannedEnd') or '2026-12-31').strip()
                        })

                # Historias Técnicas (delimitados por pipe |)
                ht_list = []
                ht_raw = row.get('TechnicalTasks') or ''
                if ht_raw:
                    ht_items = [item.strip() for item in ht_raw.split('|') if item.strip()]
                    for idx, ht_text in enumerate(ht_items):
                        ht_list.append({
                            "id": f"{hu_id}-HT-{idx+1:02d}",
                            "text": ht_text,
                            "completed": False,
                            "plannedStartDate": (row.get('HUPlannedStart') or '2026-07-01').strip(),
                            "plannedEndDate": (row.get('HUPlannedEnd') or '2026-12-31').strip()
                        })

                hu_data = {
                    "id": hu_id,
                    "projectId": proj_code,
                    "epicId": epic_id.strip() if epic_id else "",
                    "name": (row.get('HUName') or hu_id).strip(),
                    "desc": (row.get('HUDesc') or '').strip(),
                    "state": "To Do",
                    "progress": 0,
                    "plannedCost": float((row.get('HUPlannedCost') or '0').strip() or 0.0),
                    "actualCost": float((row.get('HUActualCost') or '0').strip() or 0.0),
                    "plannedStartDate": (row.get('HUPlannedStart') or '2026-07-01').strip(),
                    "plannedEndDate": (row.get('HUPlannedEnd') or '2026-12-31').strip(),
                    "actualStartDate": (row.get('HUActualStart') or '2026-07-01').strip(),
                    "actualEndDate": (row.get('HUActualEnd') or '2026-12-31').strip(),
                    "dependency": (row.get('HUDependency') or '').strip(),
                    "isCritical": (row.get('HUIsCritical') or 'FALSE').strip().upper() == 'TRUE',
                    "isMVP": (row.get('HUIsMVP') or 'FALSE').strip().upper() == 'TRUE',
                    "acceptanceCriteria": ac_list,
                    "technicalTasks": ht_list
                }
                hus.append(hu_data)

    return {
        "projects": list(projects.values()),
        "epics": list(epics.values()),
        "hus": hus
    }

if __name__ == '__main__':
    csv_file = 'backlog_carga_masiva.csv'
    json_file = 'data.json'
    
    if not os.path.exists(csv_file):
        print(f"Error: No se encontró '{csv_file}' en el directorio actual.")
        print("Asegúrate de que el archivo exista en la misma carpeta que este script.")
        sys.exit(1)
        
    try:
        data = parse_csv(csv_file)
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\n=======================================================")
        print(f"¡CONVERSIÓN EXITOSA!")
        print(f"=======================================================")
        print(f"Archivo de entrada:  {csv_file}")
        print(f"Archivo de salida:   {json_file}")
        print(f"Total Proyectos:     {len(data['projects'])}")
        print(f"Total Épicas:        {len(data['epics'])}")
        print(f"Total Historias:     {len(data['hus'])}")
        print(f"=======================================================")
        print(f"Instrucciones: Recarga el dashboard y presiona 'Restablecer Datos'")
        print(f"en 'Carga y Persistencia' para ver los datos de disco.")
        print(f"=======================================================\n")
    except Exception as e:
        print(f"Error al realizar la conversión del archivo: {e}")
        sys.exit(1)
