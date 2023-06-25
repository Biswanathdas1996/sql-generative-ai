import pandas as pd
from ydata_profiling import ProfileReport
from flask import Flask, Response, send_file
import csv_utils
import random


def generate_html(file_name):
    df = pd.read_csv(f"data/UploadedFiles/{file_name}")

    profile = ProfileReport(
        df,
        title="Profiling Report",
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
    profile.to_file("reports/report.html")

    # Read the report.html file
    with open("reports/report.html", "r") as file:
        html_content = file.read()

    # Inject custom CSS
    custom_css = """
    <style>
    a {
    color: #ad1b02;
    text-decoration: none;
    }
    .page-header{
        color: #ad1b02 !important;
        margin: 15px 0 0px;
        border-bottom: 0px;
        font-size: 2.5rem;
        font-weight: bold;
    }
    .row.header {
        border-bottom: 0px;
        padding-top: 10px !important;
        padding-left: 0px !important;
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:hover, .nav-tabs>li.active>a:focus {
        color: white;
        background-color: #AD1B02;
        border: 1px solid #ecf0f1;
        border-bottom-color: transparent;
        cursor: default;
    }
    .nav-pills>li.active>a, .nav-pills>li.active>a:hover, .nav-pills>li.active>a:focus {
        color: #ffffff;
        background-color: #ad1b02;
    }
    .row.spacing {
        padding: 2em 1em;
        box-shadow: 0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05);
        background-color: #ffffff;
        border-radius: 1rem;
        margin-top: 2rem;
    }
    #variables-dropdown {
        padding:1rem;
    }
    </style>
    """

    # Insert the custom CSS into the HTML file
    html_content_with_css = html_content.replace(
        "</head>", custom_css + "</head>")
    modified_html_template = html_content_with_css.replace("YData", "")

    random_number = random.randint(100000, 999999)
    # Convert random_number to a string
    exported_file_name = str(random_number) + ".html"

    # Save the modified HTML template to a file
    with open(f"data/GeneratedReport/{exported_file_name}", "w") as file:
        file.write(modified_html_template)

    csv_utils.add_text_to_csv(
        "data/record.csv", file_name, exported_file_name)
