import json
from datetime import datetime

with open('Dashboard/data/timeline.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

axis_start = 24
px_per_month = 4
start_year = 2013

def get_month_index(date_str):
    dt = datetime.strptime(date_str, '%Y-%m-%d')
    return (dt.year - start_year) * 12 + (dt.month - 1)

print("--- TIMELINE COORDINATES ---")
for role in data['roles']:
    start_idx = get_month_index(role['start_date'])
    
    if role['id'] == 'datacraft':
        # Use end_date from JSON (2025-08-20)
        end_idx = get_month_index(role['end_date'])
    else:
        end_idx = get_month_index(role['end_date'])
    
    left = axis_start + (start_idx * px_per_month)
    width = (end_idx - start_idx) * px_per_month
    
    print(f"{role['id']} | left: {left}px | width: {width}px")
