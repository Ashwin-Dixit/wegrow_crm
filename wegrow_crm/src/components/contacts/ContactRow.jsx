import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import Avatar from "../ui/Avatar";

export default function ContactRow({ contact }) {
  const navigate = useNavigate();

  return (
    <tr
      className="border-b border-[#e6e0e9] hover:bg-[#6750a4]/5 cursor-pointer transition-colors group"
    >
      {/* Name + Company */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar
            initials={contact.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
            size="sm"
            color="auto"
          />
          
            <p className="text-[14px] font-medium text-[#1d1b20] group-hover:text-[#4f378a] transition-colors">
              {contact.name}
            </p>
          
        </div>
      </td>

      <td className="px-4 py-3">
        <span
          className={[
            "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-[0.5px] uppercase whitespace-nowrap",
            contact.type.toLowerCase() === "client"
              ? "bg-[#c2e7d0] text-[#00531b]"
              : "bg-[#e8def9] text-[#4f378a]",
          ].join(" ")}
        >
          {contact.type}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className="text-[13px] text-[#49454f]">{contact.company}</span>
      </td>

      <td className="px-4 py-3">
        <span className="text-[13px] text-[#49454f]">{contact.email}</span>
      </td>

      <td className="px-4 py-3">
        <span className="text-[13px] text-[#49454f]">{contact.phone}</span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={`tel:${contact.phone}`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7a7582] hover:bg-[#e8def9] hover:text-[#4f378a] transition-colors"
            title="Call"
          >
            <Phone size={14} />
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7a7582] hover:bg-[#e8def9] hover:text-[#4f378a] transition-colors"
            title="Email"
          >
            <Mail size={14} />
          </a>
        </div>
      </td>
    </tr>
  );
}
