import pandas as pd
from ydata_profiling import ProfileReport
from flask import Flask, Response, send_file


def generate_html():
    df = pd.read_csv("data/SavedData/data.csv")

    profile = ProfileReport(
        df,
        title="Pandas Profiling Report",
        explorative=True,
        # 'united', 'flatly', 'cosmo', 'simplex'
        html={"style": {"theme": "flatly"}},
        plot={"correlation": {"cmap": "RdBu_r", "bad": "#000000"},
              "missing": {"cmap": "RdBu_r"},
              "variable": {"cmap": "RdBu_r", "alpha": 0.7},
              },
    )

    profile.config.html.navbar_show = False
    profile.config.html.style.primary_colors = [
        "#DB4E18", "#AD1B02", "#000000"]
    profile.config.plot.cat_freq.colors = ["#E669A2"]
    profile.config.title = "My Report"
    profile.config.dataset.description = "Test"
    profile.config.dataset.author = "Test"
    profile.config.dataset.copyright_holder = "Test"
    profile.config.dataset.copyright_year = "2026"

    # Save the report to a file
    profile.to_file("report.html")

    # Read the report.html file
    with open("report.html", "r") as file:
        html_content = file.read()

    # Inject custom CSS
    custom_css = """
    <style>
    a {
    color: #ad1b02 !important;
    text-decoration: none;
    }
    .page-header{
        color: #ad1b02 !important;
    }
    </style>
    """

    # Insert the custom CSS into the HTML file
    html_content_with_css = html_content.replace(
        "</head>", custom_css + "</head>")

    modified_html_template = html_content_with_css.replace("YData", "")

    # Save the modified HTML template to a file
    with open("report2.html", "w") as file:
        file.write(modified_html_template)

    # Return the HTML content as a response


# if __name__ == '__main__':
#     app.run()
