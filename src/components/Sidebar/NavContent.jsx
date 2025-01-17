import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "../Social";
import externalUrls from "./externalUrls";
import { ReactComponent as StakeIcon } from "../../assets/icons/v1.2/stake.svg";
import { ReactComponent as BondIcon } from "../../assets/icons/v1.2/bond.svg";
import { ReactComponent as DashboardIcon } from "../../assets/icons/v1.2/dashboard.svg";
import { ReactComponent as OlympusIcon } from "../../assets/icons/v1.2/Olympus Logo.svg";
import { trim, shorten } from "../../helpers";
import useBonds from "../../hooks/Bonds";
import { Paper, Link, Box, Typography, LinearProgress, SvgIcon } from "@material-ui/core";
import "./sidebar.scss";

function NavContent({ address }) {
  const [isActive] = useState();
  const bonds = useBonds();

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <div className="dapp-menu-top">
        <Box className="branding-header">
          <Link href="https://olympusdao.finance" target="_blank">
            <SvgIcon
              color="primary"
              component={OlympusIcon}
              viewBox="0 0 50 50"
              style={{ width: "50px", height: "50px" }}
            />
            <Typography variant="h2" color="primary">
              Olympus
            </Typography>
          </Link>

          {address && (
            <div className="wallet-link">
              <Link href={`https://etherscan.io/address/${address}`} target="_blank">
                {shorten(address)}
              </Link>
            </div>
          )}
        </Box>

        <div className="dapp-menu-links">
          <div className="dapp-nav" id="navbarNav">
            <Link
              component={NavLink}
              id="dash-nav"
              to="/dashboard"
              isActive={(match, location) => {
                return checkPage(match, location, "dashboard");
              }}
              className={`button-dapp-menu ${isActive ? "active" : ""}`}
            >
              <Typography variant="h6">
                <SvgIcon color="primary" component={DashboardIcon} />
                Dashboard
              </Typography>
            </Link>

            <Link
              component={NavLink}
              id="stake-nav"
              to="/"
              isActive={(match, location) => {
                return checkPage(match, location, "stake");
              }}
              className={`button-dapp-menu ${isActive ? "active" : ""}`}
            >
              <Typography variant="h6">
                <SvgIcon color="primary" component={StakeIcon} />
                Stake
              </Typography>
            </Link>

            <Link
              component={NavLink}
              id="bond-nav"
              to="/bonds"
              isActive={(match, location) => {
                return checkPage(match, location, "bonds");
              }}
              className={`button-dapp-menu ${isActive ? "active" : ""}`}
            >
              <Typography variant="h6">
                <SvgIcon color="primary" component={BondIcon} />
                Bond
              </Typography>
            </Link>

            <div className="dapp-menu-data discounts">
              <div className="bond-discounts">
                <Typography variant="body2">Bond discounts</Typography>
                {bonds.map((bond, i) => (
                  <Link component={NavLink} to={`/bonds/${bond.value}`} key={i} className={"bond"}>
                    {!bond.discount ? (
                      <>
                        <LinearProgress />
                      </>
                    ) : (
                      <Typography variant="body2">
                        {bond.name}
                        <span className="bond-pair-roi">{trim(bond.discount * 100, 2)}%</span>
                      </Typography>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dapp-menu-data bottom">
        <div className="dapp-menu-external-links">
          {Object.keys(externalUrls).map((link, i) => {
            return (
              <Link key={i} href={`${externalUrls[link].url}`} target="_blank">
                <Typography variant="h6">{externalUrls[link].icon}</Typography>
                <Typography variant="h6">{externalUrls[link].title}</Typography>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="dapp-menu-social">
        <Social />
      </div>
    </Paper>
  );
}

export default NavContent;
