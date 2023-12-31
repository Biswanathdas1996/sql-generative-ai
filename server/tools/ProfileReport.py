import pandas as pd
from ydata_profiling import ProfileReport
from IPython.display import display


def generateHtml():
    df = pd.read_csv("../data/SavedData/test.csv")
    profile = ProfileReport(
        df,
        title="Pandas Profiling Report",
        explorative=True,
        html={"style": {"theme": "flatly"}},
        plot={"correlation": {"cmap": "RdBu_r", "bad": "#000000"},
              "missing": {"cmap": "RdBu_r"},
              "variable": {"cmap": "RdBu_r", "alpha": 0.7},
              },
    )

    # profile.config.html.minify_html = False
    # profile.config.html.style.theme = "flatly"
    profile.config.html.style.primary_colors = [
        "#DB4E18", "#AD1B02", "#000000"]
    profile.config.plot.cat_freq.colors = ["#E669A2"]

    profile.to_widgets()
    profile.to_file("report.html")

    # Read the report.html file
    with open("report.html", "r") as file:
        html_content = file.read()

    # Inject custom CSS
    custom_css = """
  <style>

  </style>
  """

    # Insert the custom CSS into the HTML file
    html_content_with_css = html_content.replace(
        "</head>", custom_css + "</head>")

    # Write the modified HTML content back to the report.html file
    with open("report.html", "w") as file:
        file.write(html_content_with_css)
