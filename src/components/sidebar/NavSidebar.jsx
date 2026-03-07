"use client";
import navigation from "@/data/navigation";
import { isActiveNavigation } from "@/utils/isActiveNavigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import WaitlistButton from "@/components/ui/WaitlistButton";

export default function NavSidebar() {
  const path = usePathname();
  const crossRef = useRef(null);
  const { isSignedIn } = useUser();

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header border-bottom">
          <Link href="/">
            <Image
              alt="SkillLinkup"
              width={172}
              height={40}
              src="/images/logo/skilllinkup-transparant-rozepunt.webp"
            />
          </Link>
          <button
            ref={crossRef}
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="ui-navigation-sidebar">
            <Sidebar>
              <Menu>
                {navigation.map((item,i) =>
                  item?.children ? (
                    <SubMenu
                      key={ i }
                      label={item.name}
                      className={
                        isActiveNavigation(path, item) ? "ui-mobile-active" : ""
                      }
                    >
                      {item.children.map((item2,i2) =>
                        item2?.children ? (
                          <SubMenu
                            key={i2}
                            label={item2.name}
                            className={
                              isActiveNavigation(path, item2)
                                ? "ui-mobile-active"
                                : ""
                            }
                          >
                            {item2.children.map((item3,i3) => (
                              <MenuItem
                                key={i3}
                                component={<Link href={item3.path} />}
                                className={
                                  item3.path === path ||
                                  item3.path === path.replace(/\/\d+$/, "")
                                    ? "ui-mobile-active"
                                    : ""
                                }
                              >
                                <span data-bs-dismiss="offcanvas">
                                  {item3.name}
                                </span>
                              </MenuItem>
                            ))}
                          </SubMenu>
                        ) : (
                          <MenuItem
                            key={i2}
                            component={<Link href={item2.path} />}
                            className={
                              item2.path === path ? "ui-mobile-active" : ""
                            }
                          >
                            <span data-bs-dismiss="offcanvas">
                              {item2.name}
                            </span>
                          </MenuItem>
                        ),
                      )}
                    </SubMenu>
                  ) : (
                    <MenuItem
                      key={ i }
                      component={<Link href={item.path} />}
                      className={item.path === path ? "ui-mobile-active" : ""}
                    >
                      <span data-bs-dismiss="offcanvas">{item.name}</span>
                    </MenuItem>
                  ),
                )}
              </Menu>
            </Sidebar>
          </div>
          {isSignedIn ? (
            <div className="p-3 mt-3 border-top">
              <Link
                href="/dashboard"
                className="ud-btn btn-thm w-100 bdrs8 text-white mb-2"
              >
                <span data-bs-dismiss="offcanvas">
                  Dashboard <i className="fal fa-arrow-right-long" />
                </span>
              </Link>
            </div>
          ) : (
            <div className="p-3 mt-3 border-top d-flex flex-column gap-2">
              <Link
                href="/login"
                className="ud-btn btn-white bdrs8 w-100 text-center"
              >
                <span data-bs-dismiss="offcanvas">
                  Sign in <i className="fal fa-arrow-right-long" />
                </span>
              </Link>
              <Link
                href="/become-seller"
                className="ud-btn btn-thm bdrs8 w-100 text-white text-center"
              >
                <span data-bs-dismiss="offcanvas">
                  Become a Seller <i className="fal fa-arrow-right-long" />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
