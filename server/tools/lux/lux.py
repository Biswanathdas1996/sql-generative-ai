from dataprofiler import Data, Profiler
import json

df = Data("data/Train_Dataset.csv")
profile = Profiler(df)
report = profile.report(report_options={"output_format": "pretty"})
print('\nREPORT:\n' + '='*80)
print(json.dumps(report, indent=4))
