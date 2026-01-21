import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import PropTypes from "prop-types";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100/50 space-y-8 animate-in fade-in slide-in-from-left duration-700">
      {Object.keys(filterOptions).map((keyItem) => (
        <Fragment key={keyItem}>
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
              {keyItem}
            </h3>
            <div className="grid gap-3">
              {filterOptions[keyItem].map((option) => (
                <Label
                  key={option.id}
                  className="flex font-bold items-center gap-3 cursor-pointer group hover:text-primary transition-all text-sm text-gray-600"
                >
                  <Checkbox
                    checked={
                      filters &&
                      Object.keys(filters).length > 0 &&
                      filters[keyItem] &&
                      filters[keyItem].indexOf(option.id) > -1
                    }
                    onCheckedChange={() => handleFilter(keyItem, option.id)}
                    className="rounded-md border-gray-200 data-[state=checked]:bg-black data-[state=checked]:border-black transition-all"
                  />
                  <span className="group-hover:translate-x-1 transition-transform">
                    {option.label}
                  </span>
                </Label>
              ))}
            </div>
          </div>
          <Separator className="bg-gray-50" />
        </Fragment>
      ))}
    </div>
  );
}

ProductFilter.propTypes = {
  filters: PropTypes.object,
  handleFilter: PropTypes.func,
};

export default ProductFilter;
