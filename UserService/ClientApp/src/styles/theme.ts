import { createMuiTheme } from "@material-ui/core/styles";

// https://silkroadcorp.sharepoint.com/sites/marketing/SilkRoadBrand/SitePages/Home.aspx
export class Brand {
    public static SilkRoadWhite = "#FFFFFF";
    public static SilkRoadBlue = "#008DFB";
    public static SilkRoadDarkBlue = "#002F6D";
    public static SilkRoadRed = "#F14D62";
    public static SilkRoadSilver = " #F6F7F8";
}

export const FontFamily = ["Open Sans", "Merriweather"];

export const theme = createMuiTheme({
    palette: {
        background: {
            default: Brand.SilkRoadSilver,
        },
        primary: {
            main: Brand.SilkRoadBlue,
        },
        secondary: {
            main: Brand.SilkRoadDarkBlue,
        },
        error: {
            main: Brand.SilkRoadRed,
        },
    },
    typography: {
        fontFamily: FontFamily.join(","),
        h1: {
            fontSize: "4.00em",
        },
        h2: {
            fontSize: "3.50em",
        },
        h3: {
            fontSize: "3.00em",
        },
        h4: {
            fontSize: "2.50em",
        },
        h5: {
            fontSize: "2.00em",
        },
        h6: {
            fontSize: "1.50em",
        },
    },
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: "0.75em",
            },
        },
    },
});
